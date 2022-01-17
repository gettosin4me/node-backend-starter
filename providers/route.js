module.exports = {
    boot(app, { routes }) {
        app.use('/api/v1/', routes());
    }
};
