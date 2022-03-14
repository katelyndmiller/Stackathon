const Sequelize = require('sequelize')
const db = require('../db')

const Picture = db.define('picture', {
    photoUrl: {
        type: Sequelize.STRING
    },
    caption: {
        type: Sequelize.STRING
    }
})

module.exports = Picture