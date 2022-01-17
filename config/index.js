const convict = require('convict');

const config = convict({
    env: {
        format: [ 'production', 'development' ],
        default: 'development',
        env: 'APP_ENV'
    }
});

config.load(require('./server'));
config.load(require('./database'));
config.load(require('./rabbitmq'));

module.exports = config;
