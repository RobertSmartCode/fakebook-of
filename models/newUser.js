const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type: String},
    phone:{type: Number},
    email:{type: String},
    src:{type: String},
    coverSrc: {type: String},
    city:{type: String},
    password:{type: String}
})

const User = mongoose.model("user", userSchema)

module.exports = User