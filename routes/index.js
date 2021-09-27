const express = require("express")
const router = express.Router()
const contactsControllers = require("../controllers/ContactsControllers")
const userControllers = require("../controllers/userControllers")
const imageControllers = require("../controllers/imageControllers")


router.route("/")
.get(contactsControllers.home)

router.route("/signup")
.get(contactsControllers.home)

router.route("/signin")
.get(contactsControllers.home)

router.route("/user/data/:id")
.get(contactsControllers.userData)
.post(contactsControllers.newContact)


router.route("/user/signup")
.post(userControllers.signUp)

router.route("/user/signin")
.post(userControllers.signIn)

router.route("/user/logOut")
.get(userControllers.logOut)

//Imágenes

router.route("/image/:id")
.post(imageControllers.createImage)

router.route("/image/edit/:id")
.get(contactsControllers.editPost)

router.route("/image/update/:id")
.post(contactsControllers.updatePost)

router.route("/image/delete/:id")
.get(contactsControllers.deleteMessage)

module.exports = router