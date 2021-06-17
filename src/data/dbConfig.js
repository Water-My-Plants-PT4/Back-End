const knex = require('knex')
const dotenv = require('dotenv').config()
const config = require('../../knexfile')

const environment = process.env.NODE_ENV || 'development'
const env = config
module.exports = knex(
    environment !== 'development' ? env.production : env.development
)
