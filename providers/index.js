import RouteProvider from './route';
import DatabaseProvider from './database';
import LocaleProvider from './locale';
import ErrorsProvider from './errors';
import ContainerProvider from './container';

module.exports = {
    get routes() {
        return RouteProvider;
    },

    get database() {
        return DatabaseProvider;
    },

    get locale() {
        return LocaleProvider;
    },

    get errors() {
        return ErrorsProvider;
    },

    get container() {
        return ContainerProvider;
    }
};
