const Sequelize = require('sequelize')
const db = require('../db')

const Memory = db.define('memory', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Memory