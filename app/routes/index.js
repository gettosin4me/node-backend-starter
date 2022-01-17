import expressJoi from 'express-joi-validation';
import AppRoute from './app';
import checkErrors from '../middlewares/check_errors';
import { MethodNotAllowed } from '../tools/errors';

const { makeInvoker } = require('awilix-express');

const express = require('express');

const Validator = expressJoi.createValidator({
    passError: true
});

module.exports = () => {
    const router = express.Router();

    const routers = [].concat([ AppRoute ]);

    for (let i = 0; i <= routers.length - 1; i += 1) {
        routers[i](router, Validator, checkErrors, makeInvoker, MethodNotAllowed);
    }
    // enable app routes
    // AppRoute(router, Validator, checkErrors, MethodNotAllowed);
    // OnboardingRoute(router, Validator, checkErrors, MethodNotAllowed);
    // UserRoute(router, Validator, checkErrors, MethodNotAllowed);
    // AuthenticationRoute(router, Validator, checkErrors, MethodNotAllowed);

    return router;
};
