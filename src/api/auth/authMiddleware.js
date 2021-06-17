const { jwtSecret } = require('../secrets')
const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')
const db = require('../../data/dbConfig')

const restricted = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (token) {
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ you: "can't touch this" })
                } else {
                    req.decodedJwt = decodedToken
                    console.log(req.decodedJwt)
                    next()
                }
            })
        } else {
            throw new Error('invalid auth data')
        }
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

async function checkUsernameForFree(req, res, next) {
    try {
        const username = req.body.username
        const user = await db
            .select('username')
            .from('users')
            .where({ username })
        console.log(user)
        console.log(username)
        if (user.length >= 1) {
            res.status(422).json({ message: 'Username taken!' })
        } else {
            next()
        }
    } catch (err) {
        next({
            apiCode: 500,
            apiMessage: 'Error checking if username exists!',
            ...err
        })
        // next(err)
    }
}

async function checkUsernameExists(req, res, next) {
    try {
        const username = req.body.username
        const user = await db
            .select('username')
            .from('users')
            .where({ username })
        if (user.length === 0) {
            res.status(401).json({
                message: 'Username does not have an account!'
            })
        } else {
            next()
        }
    } catch (err) {
        next({
            apiCode: 500,
            apiMessage: 'Error checking if username exists!',
            ...err
        })
    }
}

function requirePassword(req, res, next) {
    const { password } = req.body
    if (!password) {
        res.status(401).json({ message: 'Password is Required!' })
    } else {
        next()
    }
}

module.exports = {
    restricted,
    checkUsernameForFree,
    checkUsernameExists,
    requirePassword
}
