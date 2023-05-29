const joi = require('@hapi/joi');

// Validation for user registration
const registerValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().email().min(6).required(),
        password: joi.string().min(8).required(),
        confirm_password: joi.string().min(8).required()
    });

    return schema.validate(data);
};

// Validation for user login
const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().email().min(6).required(),
        password: joi.string().min(8).required()
    });

    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
