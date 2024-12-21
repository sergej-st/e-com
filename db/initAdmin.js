 const User = require("../models/User")



 const initAdmin = async () =>{
    const admin = {name:"admin",password: process.env.ADMIN_PASSWORD,email:"admin@system.com",role:"admin"}

    if(await User.countDocuments() === 0){
      await User.create(admin)
    }
 }

 module.exports = initAdmin