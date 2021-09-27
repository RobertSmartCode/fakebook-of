const Contact = require("../models/contact")
const Message = require("../models/message")
const User = require("../models/newUser")
const moment = require("moment")

const contactsControllers ={
    home: async (req, res) => {
        const messagesFounds = await Message.findAll({include: [User], raw: true})
        let date = messagesFounds.map(message => { return moment(message.createdAt, "YYYYMMDD").fromNow() })
        messagesFounds.reverse()
        date.reverse()
        res.render("index", {
            title: "Home",
            date,
            comments: messagesFounds,
            sign: req.url === "/signin",
            title: req.url === "/signin" ? "Log in" : (req.url === "/" ? "Home" :"Log on"),
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            userPhoto: req.session.src,
            userName: req.session.name,
            error: null,
            info: null
        })
    },



    userData: async (req, res) => {
        const contacts = await User.findOne({where: {id: req.params.id}})
        res.render("contactData", {
            title: "Perfil",
            contacts,
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            userPhoto: req.session.src,
            userName: req.session.name,
            error: null,
            info:null
        })
    },


    newContact: async (req, res) => {
        const {name, lastName, phone, email, src, city, street, num, coverSrc} = req.body
         let newContact = Contact.create({
            name,
            lastName, 
            phone, 
            email,
            coverSrc, 
            src, 
            city, 
            street, 
            num,
            userId: req.params.id,
        })
        await newContact.save()
        res.redirect(`/user/data/${req.session.userId}`)
    },

    

    editPost: async (req, res) => {
        const comment = await Message.findOne({raw: true, where: {id: req.params.id}})
        const friends = await User.findByPk(req.session.userId)
        res.render("index", {
            title: "Editar post",
            info: comment,
            comments: [comment],
            sign: req.url === "/signin",
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            userPhoto: req.session.src,
            userName: req.session.name,
            error: null
        })
    },

    updatePost: async (req, res) => {
        const postFound = await Message.update({...req.body, comment: req.body.comment, image: req.body.image}, {where: {id: req.params.id}})
        res.redirect("/")
    },

    

    deleteMessage: async (req, res) => {
        const messageFound = await Message.findByPk(req.params.id)
        messageFound.destroy()
            res.redirect('/')
    },
 
}

module.exports = contactsControllers 