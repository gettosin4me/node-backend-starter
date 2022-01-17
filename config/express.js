/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');
require('babel-polyfill');
const fs = require('fs');
const awilix = require('awilix');
const { scopePerRequest } = require('awilix-express');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const i18n = require('i18n');
const FileStreamRotator = require('file-stream-rotator');
const morgan = require('morgan');
const config = require('.');
const routes = require('../app/routes');
const providers = require('../providers');
const loggerInit = require('./logger');
const { i18nOptions, mongooseOptions } = require('./options');
const ResponseTransformer = require('../app/utils/ResponseTransformer');
const errors = require('../app/middlewares/errors');

const logDirectory = './log';
const checkLogDir = fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

/**
 * Called when server is started...
 * Displays information on the console
 */
function started() {
    console.log(
        [
            '---------------------------',
            'Server Running',
            '---------------------------',
            `Port: ${config.get('server.app.port')}`,
            '---------------------------'
        ].join('\r\n')
    );
}
module.exports = () => {
    const app = express();
    let accessLogStream,
        logger;

    // initialize logger
    if (app.get('env') === 'development') {
        logger = loggerInit('development');
    } else if (app.get('env') === 'production') {
        logger = loggerInit('production');
    } else if (app.get('env') === 'test') {
        logger = loggerInit('test');
    } else {
        logger = loggerInit();
    }

    global.logger = logger;

    if (checkLogDir) {
        accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: `${logDirectory}/access-%DATE%.log`,
            frequency: 'weekly',
            verbose: false
        });
    }

    app.use(morgan('combined', { stream: accessLogStream }));

    // protect app from well known vulnerability
    app.use(helmet());

    app.disable('x-powered-');

    app.use(cors());

    // initialise bodyParser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: 100000 }));

    // Database connection
    providers.database.boot(mongoose, { config, options: mongooseOptions });

    // initialize container
    const container = providers.container.boot(app, { awilix });

    app.use(scopePerRequest(container));

    // init localization
    providers.locale.boot(app, { i18n, i18nOptions });

    // bootstrap routes
    providers.routes.boot(app, { config, routes });

    // catch 404 and forward to error handler
    app.use((req, res) => ResponseTransformer.error(req, res, {
        message: 'Route Not Found'
    }));

    // bootstrap errors
    providers.errors.boot(app, errors);

    //  start server an d log the  port on console
    app.listen(config.get('server.app.port'), started);

    return app;
};
