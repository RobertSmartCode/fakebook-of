const Sequelize = require("sequelize")
const db = require("../config/database")

const User = db.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {type: Sequelize.STRING, allowNull: false},
    phone: {type: Sequelize.INTEGER, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    src: {type: Sequelize.STRING, allowNull: false},
    coverSrc: {type: Sequelize.STRING, allowNull: false},
    city: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false}
})

module.exports = User