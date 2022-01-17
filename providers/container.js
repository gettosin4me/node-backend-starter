/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const config = require('../config');
const errors = require('../app/tools/errors');

function formatToCamelCase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports = {
    boot(app, { awilix }) {
        const {
            asValue, createContainer, listModules, Lifetime
        } = awilix;
        const container = createContainer();

        container
            .loadModules(
                [
                    // Globs!
                    'app/models/**/*.js',
                    'app/data-access/**/*.js',
                    'app/factory/**/*.js',
                    'app/controllers/**/*.js'
                ],
                {
                    formatName: 'camelCase',
                    registrationOptions: {
                        lifetime: Lifetime.SCOPED
                    }
                }
            )
            .register({
                config: asValue(config),
                errors: asValue(errors)
            });

        const models = listModules('../app/models/*.js', { cwd: __dirname });
        models.forEach((m) => {
            container.register({
                [formatToCamelCase(m.name)]: asValue(require(m.path))
            });
        });

        return container;
    }
};
