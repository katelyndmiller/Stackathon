const Sequelize = require('sequelize')
const db = require('../db')

const Pin = db.define('pin', {
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Pin