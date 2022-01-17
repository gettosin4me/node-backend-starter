const Base = require('../base');

class Conflict extends Base {
    constructor(message) {
        super();
        Error.captureStackTrace(this, this.constructor);

        this.name = 'Conflict';
        this.message = message || 'Conflict Error Exceptions';
        this.statusCode = 409;
        this.errorCode = 409;
    }
}

module.exports = Conflict;
