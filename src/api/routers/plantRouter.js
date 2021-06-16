const router = require('express').Router()
const Plant = require('../models/plantModel')
const reqBody = require('./routeMiddleware')

//Get All
router.get('/', async (req, res, next) => {
    try {
        const plant = await Plant.findAll()
        res.json(plant)
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Getting Plants!', ...err })
    }
})
// Get by ID
router.get('/:id', async (req, res, next) => {
    try {
        const plant = await Plant(Plant.findById(req.params.id))
        res.json(plant)
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Getting Plant!', ...err })
    }
})
// Add plant
router.post('/', reqBody, async (req, res, next) => {
    try {
        let plant = await Plant.add(req.body)
        res.status(201).json(plant)
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Creating Plant!', ...err })
    }
})
// Update Plant
router.put('/:id', reqBody, async (req, res, next) => {
    try {
        const plant = await Plant.update(req.params.id, req.body)
        res.json(req.body)
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Updating Plant!', ...err })
    }
})
// Delete Plant
router.delete('/:id', async (req, res, next) => {
    try {
        const plant = await Plant.remove(req.params.id)
        res.json({ message: `Plant removed with the ID of ${req.params.id}` })
    } catch (err) {
        next({ apiCode: 500, apiMessage: 'Error Deleting Plant!', ...err })
    }
})

module.exports = router
