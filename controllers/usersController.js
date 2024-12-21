
const { NotFoundError, BadRequestError, UnauthenticatedError, CustomAPIError } = require("../errors")
const User = require("../models/User")
const {StatusCodes} = require("http-status-codes")
const { updateUserValidation } = require("../validators/userValidations")
const e = require("express")

const getAllUsers = async(req,res) =>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users})
}

const getUserById = async(req,res) =>{
    const{id} = req.params
    if(!id) throw new BadRequestError("id not present")
    const user = await User.findById(id).select('-password')
    if(!user) throw new NotFoundError(`user with id: ${id} not found`)
    
    res.status(StatusCodes.OK).json({user})

}

const showCurrentUser = async(req,res) =>{
    const user = req.user
    if(!user){
        throw new UnauthenticatedError("you have no permission...please log in")
    }
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async(req,res) =>{
    const{id} = req.params
    if(!id) throw new BadRequestError("id not present")
    const{error,value} = updateUserValidation(req.body)
    if(error){
        throw  CustomAPIError.fromJoiError(error)
    }
    const user = await User.findByIdAndUpdate(id, value, { new: true }).select('-password')
    if(!user) throw new NotFoundError(`user with id: ${id} not found`)
    res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async(req,res) =>{
    const{id} = req.params
    if(!id) throw new NotFoundError(`user with id: ${id} not found`)
    await User.findByIdAndDelete(id)
    res.status(StatusCodes.NO_CONTENT).send()
}

const changePassword = async(req,res) =>{

}

module.exports = {
    getAllUsers,
    getUserById,
    showCurrentUser,
    updateUser,
    deleteUser,
    changePassword
}