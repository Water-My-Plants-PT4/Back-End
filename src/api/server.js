const express = require('express').Router()
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require('./routers/userRouter')
const plantRouter = require('./routers/plantRouter')
const authRouter = require('./auth/authRouter')
const errorHandler = require('./errorHandler')
const router = require('./routers/userRouter')
const { restricted } = require('./auth/authMiddleware')
// Server Initialization
const server = express()
router.get('/', (req, res) => {
    res.json({
        message:
            'View API information here: "https://documenter.getpostman.com/view/13716963/TzeWHTuR#ec0f9f6a-2e14-4b48-b8fa-40f616c0b245"'
    })
})
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
