const AppController = require('../controllers/AppController');

module.exports = (
    router,
    Validator,
    check_errors,
    makeInvoker,
    MethodNotAllowed
) => {
    const controller = makeInvoker(AppController);

    router
        .route('/')
        .get(check_errors(controller('index')))
        .all(MethodNotAllowed);

    return router;
};
