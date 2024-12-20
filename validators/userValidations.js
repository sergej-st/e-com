const Joi = require("joi");
const validator = require("./validator")

const createUserValidatorSchema = Joi.object({
    name: Joi.string().max(20).lowercase().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').default('user')
})


module.exports ={
    createUserValidation: validator(createUserValidatorSchema),
} 