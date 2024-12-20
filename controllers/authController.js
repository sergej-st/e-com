const CustomAPIError = require("../errors/custom-api")
const User = require("../models/User")
const {createUserValidation} = require("../validators/userValidations")
const {StatusCodes} = require("http-status-codes")

const register = (req,res) => {
    const{error,value} = createUserValidation(req.body)
    if(error){
        throw  CustomAPIError.fromJoiError(error)
    } 
    res.send("ok")
}

const login = (req,res) =>{

}

const logout = (req,res) =>{

}


module.exports = {
    register,
    login,
    logout
}