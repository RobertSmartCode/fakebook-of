const path = require("path")
const { randomNumber } = require("../functionExtra/extraFunctions")
const fs = require("fs-extra")
const Message = require("../models/message")
require("dotenv").config()

const imageControllers={
    createImage: async (req, res) =>{
        const imgUrl = randomNumber()
        const imageRepeat = await Message.find({image: imgUrl})
        if (imageRepeat.length > 0) {
            this.createImage
        }else {
        const imageTempPath = req.file.path
        const ext = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.resolve(`./public/upload/${imgUrl}${ext}`)

        if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
           await fs.rename(imageTempPath, targetPath)
           let newMessage
           if (!req.body._id) {
            newMessage = new Message({
                image: `${process.env.PORT || 4000, process.env.HOST || "0.0.0.0"}` + "/public/upload/" + imgUrl + ext,
                comment: req.body.comment,
                userId: req.params._id
            })

            }else {
                newMessage.comment = req.body.comment,
                newMessage.image = req.body.image,
                newMessage.userId = req.params._id
            }
            await newMessage.save()
            res.redirect("/")
        }else {
           await fs.unlink(imageTempPath)
        }
    }
    },


}

module.exports = imageControllers