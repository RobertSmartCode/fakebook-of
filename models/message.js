const Sequelize = require("sequelize")
const db = require("../config/database")

const Message = db.define("message", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    comment:{type: Sequelize.STRING, allowNull: false},
    image:{type: Sequelize.STRING, allowNull: false},
})

module.exports = Message