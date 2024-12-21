const CustomAPIError = require("../errors/custom-api")
const {UnauthenticatedError} = require("../errors/index")
const User = require("../models/User")
const {createUserValidation} = require("../validators/userValidations")
const {loginValidation} = require("../validators/authValidations")
const {StatusCodes} = require("http-status-codes")

const register = async (req,res) => {
    const{error,value} = createUserValidation(req.body)
    if(error){
        throw  CustomAPIError.fromJoiError(error)
    } 
    const email = User.findByEmail(req.body.email)
    if(email) throw CustomAPIError("email already exists",StatusCodes.BAD_REQUEST)
    
    await User.create(value)
    res.status(StatusCodes.CREATED).json({value})
}

const login = async (req,res) =>{

    const {error,value} = loginValidation(req.body)
    if(error){
        throw CustomAPIError.fromJoiError(error)
    }
    const user = await User.findOne({name:value.name})
    const isPassword = await user.comparePassword(value.password)

    if(!isPassword){
        throw new UnauthenticatedError("bad credentials")
    }
    res.send("ok")
}

const logout = (req,res) =>{

}


module.exports = {
    register,
    login,
    logout
}