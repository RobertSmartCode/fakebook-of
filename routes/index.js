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


router.route("/user/friend/:_id")
.post(contactsControllers.addFriend)

router.route("/user/data/:_id")
.get(contactsControllers.userData)
.post(contactsControllers.newContact)


router.route("/user/contact/:_id")
.get(contactsControllers.contactCard)

router.route("/user/contact/edit/:_id")
.get(contactsControllers.editContact)

// router.route("/user/contact/delete/:_id")
// .get(contactsControllers.deleteContact)

router.route("/user/signup")
.post(userControllers.signUp)

router.route("/user/signin")
.post(userControllers.signIn)

router.route("/user/logOut")
.get(userControllers.logOut)

router.route("/user/message")
.post(contactsControllers.newMessage)


//Imágenes

router.route("/image/:_id")
.post(imageControllers.createImage)

router.route("/image/edit/:_id")
.get(contactsControllers.editPost)

router.route("/image/delete/:_id")
.get(contactsControllers.deleteMessage)

module.exports = router