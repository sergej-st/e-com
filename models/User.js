const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    }
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
UserSchema.statics.findByEmail = async function(email) {
    return await this.findOne({ email });
}

//middleware
UserSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


module.exports = mongoose.model("User",UserSchema)