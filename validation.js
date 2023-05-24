const Joi = require('@hapi/joi');

// Validation for user registration
const validateRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(8).required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required()
    });

    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }

    return value;
};

// Validation for user login
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(8).required()
    });

    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }

    return value;
};

module.exports = { validateRegistration, validateLogin };