//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Pin = require('./models/Pin')

//associations could go here!
// User.belongsToMany(Pin, {through: "user_pin"})
// Pin.belongsToMany(User, {through: "user_pin"})

User.hasMany(Pin)
Pin.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Pin
  },
}
