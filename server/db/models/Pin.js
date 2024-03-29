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
    },
    title: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    isPrivate: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = Pin