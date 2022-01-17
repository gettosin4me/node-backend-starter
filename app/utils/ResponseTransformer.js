const config = require('../../config');

class Response {
    constructor(domain) {
        this.domain = domain || config.get('server.app.domain');
    }

    success(path, response) {
        const current_url = `${this.domain}${path}`;
        // const messages = err.message || err.error.message;

        if (response.length <= 0) {
            return new Error('Error: Object (data) is required!');
        }

        const { message, data } = response;

        return {
            current_url,
            message,
            data,
            status: 'Success'
        };
    }

    error(req, res, err) {
        const current_url = `${this.domain}${req.originalUrl}`;
        const message = err.message || 'Bad Request';
        const code = err.statusCode || err.code || 400;
        if (!message) {
            return new Error('Error: Object (message) is required!');
        }

        return res.status(code).json({
            current_url,
            message,
            // name: err.name || err.error.name,
            status_code: code
        });
    }

    validation_error(req, res, err) {
        const current_url = `${this.domain}${req.originalUrl}`;
        const message = err.message || err.error.message;
        const code = err.statusCode || 422;

        if (!message) {
            return new Error('Error: Object (message) is required!');
        }

        return res.status(422).json({
            current_url,
            message,
            name: err.name || err.error.name,
            errors: err.errors || err.error.details,
            code
        });
    }
}

module.exports = new Response();
