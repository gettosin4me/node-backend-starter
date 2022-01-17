const Joi = require('@hapi/joi');

const createUserSchema = Joi.object().keys({
    first_name: Joi.string().required().min(2),
    last_name: Joi.string().required().min(2),
    user_type: Joi.string().required()
});

module.exports = createUserSchema;
