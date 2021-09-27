const express = require("express")
const path = require("path")
const session = require("express-session")
const database = require("./config/database")
require("dotenv").config()
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const User = require("./models/newUser")
const Message = require("./models/message")
const myStore = new SequelizeStore({
    db: database,
  });

const middlewares = require("./controllers/middlewares")
const morgan = require("morgan")
const multer = require("multer")

const router = require("./routes/index")
const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")

app.use(morgan("dev"))
app.use(multer({dest: path.join(__dirname, "./public/upload/temp")}).single("image"))

app.use(express.urlencoded({extended: true}))
// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: myStore
// }))

app.use(
    session({
      secret: process.env.SECRET,
      store: myStore,
      resave: false,
      saveUninitialized: false,
      proxy: true,
    })
  );

myStore.sync();


Message.belongsTo(User)
User.hasMany(Message)
// Contact.hasMany(User)


database.sync()
.then(() =>{
    app.use("/", router)
    app.listen(4000, () => console.log("Server is on"))
})

