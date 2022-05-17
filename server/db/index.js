//access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Pin = require('./models/Pin')

//associations

User.hasMany(Pin)
Pin.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Pin
  },
}
