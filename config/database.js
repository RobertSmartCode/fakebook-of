const Sequelize = require('sequelize')
const db = new Sequelize('fakebook', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db