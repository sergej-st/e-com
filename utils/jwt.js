const jwt = require("jsonwebtoken")


const generateToken = ({payload})=>{

    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
    return token
}

const verifyToken = ({token}) =>{
    return jwt.verify(token,process.env.JWT_SECRET)
}


module.exports = {
    generateToken,
    verifyToken
}