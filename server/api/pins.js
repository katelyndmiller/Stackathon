const router = require('express').Router();
const {
  models: { Pin, User },
} = require('../db');
module.exports = router;

// GET api/pins/:userId
router.get('/:userId', async (req, res, next) => {
    try {
        const allUsersPins = await Pin.findAll({
            where: {
                userId: req.params.userId
            }
            // include: {
            //     model: User,
            //     where: {
            //       userId: req.params.userId
            //     }
            //   }
        })
        res.json(allUsersPins)
    } catch (error) {
        next(error)
    }
})

// POST api/pins/add/:userId
router.post('/add/:userId', async (req, res, next) => {
    try {
        const newPin = await Pin.create(req.body)
        const user = await User.findByPk(req.params.userId)

        await user.addPin(newPin)

        res.send(newPin)
    } catch (error) {
        next(error)
    }
})

// DELETE /api/pins/:pinId
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
