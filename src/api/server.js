const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require('./routers/userRouter')
const plantRouter = require('./routers/plantRouter')
const authRouter = require('./auth/authRouter')
const errorHandler = require('./errorHandler')
// Server Initialization
const server = express()

//Global Middleware (libraries)
server.use(cors())
server.use(express.json())
server.use(morgan('dev'))

// Custom Middleware
server.use(errorHandler)

// Routers
server.use('/api/users', userRouter)
server.use('/api/plants', plantRouter)
server.use('/api/auth', authRouter)

module.exports = server
