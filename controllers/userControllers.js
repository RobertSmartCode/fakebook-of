const User = require("../models/newUser")
const bcryptjs = require('bcryptjs')

const userControllers={
    sign: (req, res) => {
        res.render("log", {
            sign: req.url === "/user/signin",
            title: req.url === "/user/signin" ? "Log in" : "Log on",
            loggedIn: req.session.loggedIn,
            error: null,
            userId: req.session.userId
        })
    },

    signIn: async (req, res) => {
        const {email, password} = req.body
        try {
            let userLog = await User.findOne({where: {email}})
            if (!userLog) throw new Error("Email o contraseña incorrecta")
            let correctPass = bcryptjs.compareSync(password, userLog.password)
            if (!correctPass) throw new Error("Email o contraseña incorrecta")
                req.session.loggedIn = true
                req.session.user = userLog.email
                req.session.userId = userLog.id
                req.session.src = userLog.src
                req.session.name = userLog.name
                res.redirect("/")
        }catch(error){
            res.render("index",{
                title: "Log in",
                loggedIn: req.session.loggedIn,
                sign: req.url === "/user/signin",
                error: error.message
            })

        }
        
    },

    signUp: async (req, res) => {
        const {email, src, password, name, phone, coverSrc, city} = req.body
        let cryptPass = bcryptjs.hashSync(password)
        let newUser = await new User({
            name,
            phone,
            coverSrc,
            city,
            email,
            src,
            password: cryptPass,
        })
        try {
            let repeatUser = await User.findOne({where: {email}})
            if (repeatUser){
                 throw new Error("El mail ya está en uso")
            }
                await newUser.save()
                req.session.loggedIn = true
                req.session.user = newUser.email
                req.session.userId = newUser.id
                req.session.src = newUser.src
                req.session.name = newUser.name
                res.redirect("/")
            
        }catch(error){
            res.render("index",{
                title: "Log on",
                sign: req.url === "/user/signin",
                loggedIn: req.session.loggedIn,
                error: error.message
            })
        }
    },


    logOut: (req, res) => {
        req.session.destroy(() =>{
            res.redirect("/")
        })
    }
}

module.exports = userControllers