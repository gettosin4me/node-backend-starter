const BaseController = require('./Base');

class AppController extends BaseController {
    constructor({ appFactory }) {
        super();
        this.appFactory = appFactory;
    }

    async index(req, res) {
        const data = this.appFactory.getApp();

        return AppController.success(data, req, res);
    }
}

module.exports = AppController;
