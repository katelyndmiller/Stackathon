const Sequelize = require('sequelize')
const db = require('../db')

const Note = db.define('note', {
    title: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.TEXT
    }
})

module.exports = Note