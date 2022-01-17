const Base = require('../base');

class Validation extends Base {
    constructor(message, errors) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'Validation Error';
        this.message = message || 'Validation Error';
        this.statusCode = 422;
        this.errorCode = 422;
        this.errors = errors || {};
    }
}

module.exports = Validation;
