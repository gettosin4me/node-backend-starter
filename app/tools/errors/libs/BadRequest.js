const Base = require('../base');

class BadRequest extends Base {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'BadRequest';
        this.message = message || 'Bad Request';
        this.statusCode = 400;
        this.errorCode = 400;
    }
}

module.exports = BadRequest;
