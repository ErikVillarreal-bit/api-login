const joi = require('joi');

const validatedRegiter = joi.object({
    name: joi.string().min(3).max(10).required(),
    email: joi.string().min(6).max(512).required().email(),
    password: joi.string().min(6).max(12).required()
})

const validatedLogin = joi.object({
    email: joi.string().min(6).max(512).required().email(),
    password: joi.string().min(6).max(12).required()
})

module.exports = {validatedRegiter, validatedLogin}