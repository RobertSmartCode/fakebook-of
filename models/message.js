const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    comment:{type: String},
    title:{type: String},
    image:{type: String},
    timestamp: {type: Date, default: Date.now},
    userId:{type:mongoose.Types.ObjectId, ref:'user'}
})

const Message = mongoose.model("message", messageSchema)

module.exports = Message