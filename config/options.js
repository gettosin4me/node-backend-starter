const config = require('.');

// mongoose options
const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const i18nOptions = {
    locales: [ 'en', 'fr' ],
    defaultLocale: config.get('server.app.locale'),
    directory: `${__dirname}/../locales`,
    queryParameter: 'lang',
    autoReload: true
};

module.exports = { mongooseOptions, i18nOptions };
