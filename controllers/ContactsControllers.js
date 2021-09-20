const path = require("path")
const Contact = require("../models/contact")
const Message = require("../models/message")
const User = require("../models/newUser")

const contactsControllers ={
    home: async (req, res) => {
        const comments = await Message.find({userId: req.session.userId}).populate("userId")
        const friendsEmail = await Contact.find({userId: req.session.userId})
        const emailFriend = friendsEmail.map(image=> {
            return image.email})
        const friends = await User.find({email: emailFriend})
        const imagesFriends = friends.map(image => {
            return image._id
        })
        const realImagesFriends = await Message.find({userId: imagesFriends}).populate("userId")
        const realPhotos = comments.concat(realImagesFriends)
        res.render("index", {
            title: "Home",
            imagesFriends: friends,
            comments: realPhotos,
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

    addFriend: async (req, res) => {
        const {email} = req.body
        let newFriend = new Contact({
            email,
            userId: req.params._id
        })
        const friendsEmail = await Contact.find({userId: req.session.userId})
        const emailFriend = friendsEmail.map(image=> {
                return image.email})
        const friends = await User.find({email: emailFriend})
        try {
            let friendExist = await User.findOne({email})
            if (!friendExist){
                throw new Error("Este usuario no existe. Intente de nuevo")
            }
            let friendNew = await Contact.findOne({email})
            if (friendNew) throw new Error("Este usuario ya se encuentra en su agenda")
            
            await newFriend.save() 
            res.redirect(`/user/data/${req.session.userId}`)
        }catch(error)   {
            res.render("profile",{
                title: "Mi perfil",
                contacts: friends,
                loggedIn : req.session.loggedIn,
                userId: req.session.userId,
                flagFriend: null, 
                userPhoto: req.session.src,
                userName: req.session.name,
                error: error.message
            })
        }
    },


    userData: async (req, res) => {
        const imagesFriends = await Contact.find({userId: req.session.userId})
        emailFriend = imagesFriends.map(image=> {
            return image.email})
        const friends = await User.find({email: emailFriend})
        const validFriends = imagesFriends.concat(friends)
        res.render("profile", {
            title: "Mi perfil",
            contacts: validFriends,
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            flagFriend: null, 
            userPhoto: req.session.src,
            userName: req.session.name,
            error: null
        })
    },

    newMessage: async (req, res) => {
        const {author, message, src} = req.body
    },

    newContact: async (req, res) => {
        const {name, lastName, phone, email, src, city, street, num, _id, coverSrc, flagFriend} = req.body
        let newContact
        
        if (!_id) {
        newContact = new Contact({
            name,
            lastName, 
            phone, 
            email,
            coverSrc, 
            src, 
            city, 
            street, 
            num,
            userId: req.params._id,
            flagFriend: true,
        })

        }else {
            newContact = await Contact.findOne({_id})
            newContact.name = name
            newContact.lastName = lastName
            newContact.coverSrc = coverSrc
            newContact.src = src
            newContact.email = email
            newContact.phone = phone
            newContact.street = street
            newContact.num = num
            newContact.city = city
            newContact.userId = req.params._id
            newContact.flagFriend = true
        }

        await newContact.save()
        res.redirect(`/user/data/${req.session.userId}`)
    },

    contactCard: async (req, res) => {
        const manualContact = await Contact.findOne({_id: req.params._id})
        const contact = await User.findOne({_id: req.params._id})
        res.render("contactData", {
            title: "Contacto",
            contact,
            manualContact,
            info: null,
            flagFriend:null,
            loggedIn : req.session.loggedIn,
            userId: req.session.userId, 
            contactId: req.params._id,
            userPhoto: req.session.src,
            userName: req.session.name
        })
    },

    editPost: async (req, res) => {
        const comments = await Message.find({userId: req.session.userId})
        const friendsEmail = await Contact.find({userId: req.session.userId})
        const emailFriend = friendsEmail.map(image=> {
            return image.email})
        const friends = await User.find({email: emailFriend})
        const imagesFriends = friends.map(image => {
            return image._id
        })
        const realImagesFriends = await Message.find({userId: imagesFriends})
        const realPhotos = comments.concat(realImagesFriends)
        let messageInfo = await Message.findOne({userId: req.params._id})
        res.render("index", {
            title: "Editar post",
            imagesFriends: friends,
            comments: realPhotos,
            info:null,
            info: messageInfo,
            sign: req.url === "/signin",
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            userPhoto: req.session.src,
            userName: req.session.name,
            error: null
        })
    },

    editContact: async (req, res) => {
        let contactInfo = await Contact.findOne({_id: req.params._id})
        res.render("contactData", {
            title: "Editar contacto",
            info: null,
            info: contactInfo,
            loggedIn : req.session.loggedIn,
            userId: req.session.userId,
            contactId: req.params._id,
            userPhoto: req.session.src,
            userName: req.session.name
        })
    },

    deleteMessage: async (req, res) => {
        await Message.findOneAndDelete({_id: req.params._id})
        req.session.destroy(()=>{
            res.redirect('/')
        })
    },
 
}

module.exports = contactsControllers 