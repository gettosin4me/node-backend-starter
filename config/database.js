let url;

switch (process.env.APP_ENV.toLowerCase()) {
        case 'test':
            url = process.env.DATABASE_TEST_URL;
            break;
        case 'development':
        case 'production':
            url = process.env.DATABASE_URL;
            break;
        default:
            url = process.env.DATABASE_URL;
            break;
}

exports.database = {
    url
};
