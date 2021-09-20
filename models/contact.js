const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name:{type: String},
    lastName:{type: String},
    phone:{type: Number},
    email:{type: String},
    src:{type: String},
    coverSrc: {type: String},
    city:{type: String},
    street:{type: String},
    num:{type: Number},
    flagFriend:{type: Boolean, default: false},
    userId:{type:mongoose.Types.ObjectId, ref:'user'}
})

const Contact = mongoose.model("contact", contactSchema)

module.exports = Contact
