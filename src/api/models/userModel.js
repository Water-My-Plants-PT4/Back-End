const bcrypt = require('bcrypt')
const db = require('../../data/dbConfig')

// Find all users
const findAll = () => {
    return db
        .select('u.id', 'u.username', 'u.phone_number')
        .from('users as u')
        .orderBy('u.id')
}
//Find user by ID
const findById = async (id) => {
    const user = await db
        .select('u.id', 'u.username', 'u.phone_number')
        .from('users as u')
        .where({ id })
        .first()
    const newObj = {
        id: user.id,
        username: user.username,
        phone_number: user.phone_number,
        plants: await findUserPlants(user.id)
    }
    return newObj
}
// Find with filter
const findByFilter = (filter) => {
    return db('users').where(filter)
}
//Find users plants
const findUserPlants = async (id) => {
    const plants = await db('plants as p')
        .join('users_plants as upl', 'upl.plant_id', 'p.id')
        .join('users as u', 'u.id', 'upl.user_id')
        .select('p.id', 'p.nickname', 'p.species', 'p.h2o_frequency', 'p.image')
        .where({ 'upl.user_id': id })
        .groupBy('p.id')
        .then((row) => {
            return row
        })
    return plants
}
// Add user
const add = async (user) => {
    const [id] = await db('users').returning('id').insert(user)
    return findById(id)
}
// Add users plant
const addUserPlant = (id, plantId) => {
    return db('users_plants').insert({ user_id: id, plant_id: plantId })
}
// Update User
const update = async (id, changes) => {
    const hash = bcrypt.hashSync(changes.password, 8)
    changes.password = hash

    const [updatedId] = await db('users')
        .where({ id: updatedId })
        .update({
            username: changes.username,
            phone_number: changes.phone_number,
            password: changes.password
        })
        .returning('id')

    const updated = await db('users').where({ id: updatedId }).first()

    return updated
}
// Remove User
const remove = (id) => {
    return db('users').where({ id }).del()
}
// Remove users plant
const removeUserPlant = (id, plantId) => {
    return db('users_plants').where({ user_id: id, plant_id: plantId }).del()
}

module.exports = {
    findAll,
    findById,
    findByFilter,
    add,
    addUserPlant,
    update,
    remove,
    removeUserPlant
}
