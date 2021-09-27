const path = require("path")
const { randomNumber } = require("../functionExtra/extraFunctions")
const fs = require("fs-extra")
const Message = require("../models/message")

const imageControllers={
    createImage: async (req, res) =>{
                const imgUrl = randomNumber()
                const imageRepeat = await Message.findAll({where: {image: imgUrl}})
                if (imageRepeat.length > 0) {
                    this.createImage
                }else {
                const imageTempPath = req.file.path
                const ext = path.extname(req.file.originalname).toLowerCase()
                const targetPath = path.resolve(`./public/upload/${imgUrl}${ext}`)

                if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
                await fs.rename(imageTempPath, targetPath)
                let newMessage
                newMessage = await new Message({
                    image: imgUrl + ext,
                    comment: req.body.comment,
                    userId: req.params.id
                })
            await newMessage.save()
            res.redirect("/")
        }else {
           await fs.unlink(imageTempPath)
        }
    }
    },


}

module.exports = imageControllers