const {CustomAPIError, UnauthenticatedError} = require("../errors/index")

const adminMiddleware = (req,res,next) =>{
    const user = req.user 
    if(user && user.role === "admin"){
       return next()
    }

    throw new UnauthenticatedError("no permissions")

}



module.exports = adminMiddleware