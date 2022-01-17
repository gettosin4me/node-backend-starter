const NotFound = require('./libs/NotFound');
const Custom = require('./libs/Custom');
const BadRequest = require('./libs/BadRequest');
const Unauthorize = require('./libs/Unauthorize');
const Conflict = require('./libs/Conflict');
const Validation = require('./libs/Validation');
const MethodNotAllowed = require('./libs/MethodNotAllowed');
const ServiceUnavailable = require('./libs/ServiceUnavailable');

module.exports.NotFound = (message) => new NotFound(message);

module.exports.Custom = (name, message, code) => new Custom(name, message, code);
module.exports.BadRequest = (message) => new BadRequest(message);
module.exports.Unauthorize = (message) => new Unauthorize(message);
module.exports.Conflict = (message) => new Conflict(message);
module.exports.Validation = (message, errors) => new Validation(message, errors);
module.exports.MethodNotAllowed = (message) => new MethodNotAllowed(message);
module.exports.ServiceUnavailable = (message) => new ServiceUnavailable(message);
