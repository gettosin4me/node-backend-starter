class AppService {
    constructor({ config }) {
        this.config = config;
    }

    getApp() {
        return { domain: this.config.get('server.app.domain') };
    }
}

module.exports = AppService;
