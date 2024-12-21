
const Joi = require("joi");
const validator = require("./validator")


const loginValidatorSchema = Joi.object({
    name: Joi.string().lowercase().required(),
    password: Joi.string().min(6).required()
})


module.exports = {
    loginValidation: validator(loginValidatorSchema)
}