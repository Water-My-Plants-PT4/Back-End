const router = require('express').Router()
const Users = require('../models/userModel')
const { restricted } = require('../auth/authMiddleware')
const reqBody = require('./routeMiddleware')

// Get all users
router.get('/', async (req, res, next) => {
    try {
        const users = await Users.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        next({ apiCode: 500, apiMessage: 'error getting users', ...err })
    }
})

// Get user by ID
router.get('/:id', restricted, async (req, res, next) => {
    const id = req.params.id
    if (!id) {
        next({ apiCode: 404, apiMessage: 'User Not Found.' })
    }
    try {
        const user = await Users.findById(id)
        res.json(user)
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error retrieving user', ...err })
    }
})

// Add plant to User
router.post('/:id', reqBody, restricted, async (req, res, next) => {
    const id = req.params.id
    if (!id) {
        next({ apiCode: 404, apiMessage: 'User Not Found.' })
    }
    try {
        const addedPlant = await Users.addPlantToUser(
            req.params.id,
            req.body.plant_id
        )
        const user = await Users.findById(id)
        res.status(201).json(user)
    } catch (err) {
        next({
            apiCode: 500,
            apiMessage: 'Error adding plant to user.',
            ...err
        })
    }
})

// Delete User
router.delete('/:id', restricted, async (req, res, next) => {
    const id = parseInt(req.params.id)
    if (!id) {
        next({ apiCode: 404, apiMessage: 'User Not Found.' })
    }

    try {
        const user = await Users.remove(id, {})
        res.json({ message: `User with id ${req.params.id} has been deleted` })
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Deleting User.', ...err })
    }
})

// Delete Users Plant
router.delete('/:id/plant', reqBody, restricted, async (req, res, next) => {
    const id = parseInt(req.params.id)
    if (!id) {
        next({ apiCode: 404, apiMessage: 'User Not Found.' })
    }
    try {
        const deletedPlant = await Users.removePlantFromUser(
            req.params.id,
            req.body.plant_id
        )
        res.json({
            message: `Plant with id ${req.body.plant_id} has been deleted from user ${req.params.id}`
        })
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Deleting User.', ...err })
    }
})

// Update User
router.put('/:id', reqBody, restricted, async (req, res, next) => {
    const id = parseInt(req.params.id)
    // console.log(req.body)
    if (!id) {
        next({ apiCode: 400, apiMessage: 'Provide ID', ...err })
    }

    try {
        const user = await Users.update(id, req.body)
        res.json(user)
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Updating User.', ...err })
    }
})

module.exports = router
