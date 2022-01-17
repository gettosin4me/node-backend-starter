const ResponseTransformer = require('../utils/ResponseTransformer');

class BaseController {
    static success(data, req, res, message = 'Success') {
        res
            .status(200)
            .json(ResponseTransformer.success(req.originalUrl, { message, data }));
    }

    static handleError(error, req, res) {
        const status = error.error_code || 500;
        let message = '';
        if (!error.error_message) {
            message =
        'A service error has occured and is being worked upon. Please try again later.';
        } else {
            message = error.error_message;
        }
        return res
            .status(status)
            .json(ResponseTransformer.error(req.originalUrl, message, error));
    }
}

module.exports = BaseController;
