const db = require('../../data/dbConfig')

// Find all plants
const findAll = () => {
    return db('plants').orderBy('plants.id')
}
// Find plant by ID
const findById = (id) => {
    return db('plants').where({ id }).first()
}
// Add plant to DB
const add = async (plant) => {
    const [id] = await db('plants').returning('id').insert(plant)
    return findById(id)
}
// Remove plant
const remove = (id) => {
    return db('plants').where({ id }).del()
}
// Update plant
const update = (id, changes) => {
    return db('plants').where({ id }).update(changes)
}

module.exports = {
    findAll,
    findById,
    add,
    remove,
    update
}
