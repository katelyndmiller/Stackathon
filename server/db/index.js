//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Memory = require('./models/Memory')
const Pin = require('./models/Pin')
const Note = require('./models/Note')
const Picture = require('./models/Picture')
const Mission = require('./models/Mission')

//associations could go here!
// User.belongsToMany(Pin, {through: "user_pin"})
// Pin.belongsToMany(User, {through: "user_pin"})

User.hasMany(Pin)
Pin.belongsTo(User)

User.belongsToMany(Mission, {through: "user_mission"})
Mission.belongsToMany(User, {through: "user_mission"})

Pin.hasMany(Memory)
Memory.belongsTo(Pin)

Memory.hasMany(Picture)
Picture.belongsTo(Memory)

Memory.hasMany(Note)
Note.belongsTo(Memory)

module.exports = {
  db,
  models: {
    User,
    Memory,
    Pin,
    Note,
    Picture,
    Mission
  },
}
