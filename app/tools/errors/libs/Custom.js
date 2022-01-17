const Base = require('../base');

class Custom extends Base {
    constructor(name, message, errorCode) {
        super();
        Error.captureStackTrace(this);

        this.name = name || 'CustomError';
        this.message = message || 'Something went wrong without a message';
        this.statusCode = 500;
        this.errorCode = errorCode || 500;
    }
}

module.exports = Custom;
