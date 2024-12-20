const mongoose = require("mongoose")


const connectDB = (Uri) =>{
    return mongoose.connect(Uri)
}


module.exports = connectDB