/* eslint-disable import/no-unresolved */
const amqp = require('amqplib');
const config = require('../../config');

let connectionString;
switch (config.get('server.app.environment')) {
        case 'production':
            connectionString = config.get('rabbitmq.url');
            // connectionString = `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.domain')}:${config.get('rabbitmq.port')}`;
            break;
        case 'development':
            connectionString = config.get('rabbitmq.url');
            // connectionString = `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.domain')}:${config.get('rabbitmq.port')}`;
            break;
        default:
            connectionString = config.get('rabbitmq.url');
            // connectionString = `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.domain')}:${config.get('rabbitmq.port')}`;
            break;
}

// console.log({ connectionString });
const connection = async() => {
    try {
        const amqpconnection = await amqp.connect(connectionString);
        const channel = await amqpconnection.createConfirmChannel();

        return {
            connection: amqpconnection,
            channel
        };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const rabbitmqArchitecture = (worker) => new Promise((resolve, reject) => {
    try {
        const exchange = 'aku.abp_monitor.exchange';
        console.log({ exchange, worker });
        switch (worker) {
                case 'farmers_analysis_queue':
                    resolve({
                        queue: 'farmers_analysis.queue',
                        exchange,
                        routingKey: 'farmers_analysis.send'
                    });
                    break;
                case 'farmers_verification_queue':
                    resolve({
                        queue: 'farmers_verification.queue',
                        exchange,
                        routingKey: 'farmers_verification.send'
                    });
                    break;
                case 'farmers_analysis_mail_queue':
                    resolve({
                        queue: 'farmers_analysis_mail.queue',
                        exchange,
                        routingKey: 'farmers_analysis_mail.send'
                    });
                    break;
                case 'providers_analysis_queue':
                    resolve({
                        queue: 'providers_analysis.queue',
                        exchange,
                        routingKey: 'providers_analysis.send'
                    });
                    break;
                default:
                    throw new Error('Invalid queue: Something bad happened!');
        }
    } catch (error) {
        reject(error);
    }
});

module.exports = { rabbitmq: connection, rabbitmqArchitecture };
