class Base extends Error {
    constructor(name, message, code) {
        super(name, message, code);

        this.name = name;
        this.message = message;
        this.code = code;
    }
}

module.exports = Base;
