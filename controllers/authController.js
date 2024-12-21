const CustomAPIError = require("../errors/custom-api")
const {UnauthenticatedError} = require("../errors/index")
const User = require("../models/User")
const {createUserValidation} = require("../validators/userValidations")
const {loginValidation} = require("../validators/authValidations")
const {StatusCodes} = require("http-status-codes")
const { generateToken } = require("../utils/jwt")

const register = async (req,res) => {
    const{error,value} = createUserValidation(req.body)
    if(error){
        throw  CustomAPIError.fromJoiError(error)
    } 
    console.log(req.body)
    const savedUser  = await User.findByEmail(req.body.email)
    if(savedUser) throw new CustomAPIError("email already exists",StatusCodes.BAD_REQUEST)
    
    await User.create(value)
    const token = generateToken({ payload: {name:value.name, email:value.email,role:"user"} })
    res.status(StatusCodes.CREATED).json({user:{name:value.name,email:value.email,role:"user"},token})
}

const login = async (req,res) =>{

    const {error,value} = loginValidation(req.body)
    if(error){
        throw CustomAPIError.fromJoiError(error)
    }
    const user = await User.findOne({name:value.name})
    if(!user) throw new UnauthenticatedError("bad credentials")
    const isPassword = await user.comparePassword(value.password)

    if(!isPassword){
        throw new UnauthenticatedError("bad credentials")
    }
    const token = generateToken({ payload: {name:user.name, email:user.email,role:user.role} })
    res.status(StatusCodes.OK).json({user:{name:user.name,email:user.email,role:user.role},token})
}




module.exports = {
    register,
    login,
}