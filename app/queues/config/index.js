const path = require('path');

require('dotenv').config({
    path: path.resolve(`${__dirname}/../../../.env`)
});

const config = require('../../../config');
const providers = require('../../../providers');

providers.database.boot({ config });
