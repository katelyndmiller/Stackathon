const router = require('express').Router();
const {
  models: { Pin, User },
} = require('../db');
module.exports = router;
const { Op } = require("sequelize");

// GET api/pins/:userId
// GET PINS
router.get('/:userId', async (req, res, next) => {
    try {
        const allUsersPins = await Pin.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.json(allUsersPins)
    } catch (error) {
        next(error)
    }
})

// GET /api/pins/allUsersPins/:userId
// GET ALL USERS PINS
router.get('/allUsersPins/:userId', async (req, res, next) => {
    try {
        res.json(await Pin.findAll({
            where: {
                userId: {
                    [Op.not]: req.params.userId
                },
                isPrivate: false
            }
        }))
    } catch (error) {
        next(error)
    }
})

// GET /api/pins/singlePin/:id
// GET A SINGLE PIN
router.get('/singlePin/:id', async (req, res, next) => {
    try {
        const singlePin = await Pin.findByPk(req.params.id)
        console.log('THIS IS A SINGLE PIN', singlePin)
        res.json(singlePin)
    } catch(err) {
        next(err)
    }
})

// POST api/pins/add/:userId
// ADD NEW PIN
router.post('/add/:userId', async (req, res, next) => {
    try {
        console.log(req.body)
        const newPin = await Pin.create(req.body)
        const user = await User.findByPk(req.params.userId)

        await user.addPin(newPin)

        res.send(newPin)
    } catch (error) {
        next(error)
    }
})

// DELETE /api/pins/:pinId
// DELETE PIN
router.delete('/:id', async (req, res, next) => {
    try {
        const pin = await Pin.findByPk(req.params.id)
        console.log(pin)
        await pin.destroy()
        res.send(pin)
    } catch(error) {
        next(error)
    }
})

// PUT /api/pins/:pinId
// UPDATE PIN
router.put('/:id', async (req, res, next) => {
    try {
        const pin = await Pin.findByPk(req.params.id)
        const updatedPin = await pin.update(req.body)
        res.json(updatedPin)
    } catch(err) {
        next(err)
    }
})