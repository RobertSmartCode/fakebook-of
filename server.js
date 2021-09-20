const express = require("express")
const path = require("path")
const cors = require("cors")
const session = require("express-session")
const mongo = require("connect-mongodb-session")(session)
require("dotenv").config()
const myStore = new mongo({
   uri: process.env.MONGODB,
   collection: "sessions",
})

const middlewares = require("./controllers/middlewares")
const morgan = require("morgan")
const multer = require("multer")

const router = require("./routes/index")
const app = express()
require("./config/database")


app.use(cors())
app.use(express.static("public"))
app.set("view engine", "ejs")



app.use(morgan("dev"))
app.use(multer({dest: path.join(__dirname, "./public/upload/temp")}).single("image"))


app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: myStore
}))

app.use("/", router)

app.listen(process.env.PORT || 4000, process.env.HOST || "0.0.0.0", () => console.log("Server is on"))

