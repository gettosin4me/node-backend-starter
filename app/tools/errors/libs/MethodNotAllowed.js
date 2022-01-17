const Base = require('../base');

class MethodNotAllowed extends Base {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = 'MethodNotAllowed';
        this.message = message || 'Method Not Allowed';
        this.statusCode = 405;
        this.errorCode = 405;
    }
}

module.exports = MethodNotAllowed;
