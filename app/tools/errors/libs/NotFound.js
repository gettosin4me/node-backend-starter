const Base = require('../base');

class NotFound extends Base {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);

        this.name = 'NotFound';
        this.message = message || 'Not Found Exception';
        this.statusCode = 404;
        this.errorCode = 404;
    }
}

module.exports = NotFound;
