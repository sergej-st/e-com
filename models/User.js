const mongoose = require("mongoose")

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

UserSchema.statics.findByEmail = async function(email) {
    return await this.findOne({ email });
}


module.exports = mongoose.model("User",UserSchema)