module.exports = {
    boot(app, { i18n, i18nOptions }) {
        i18n.configure(i18nOptions);
        app.use(i18n.init);
    }
};
