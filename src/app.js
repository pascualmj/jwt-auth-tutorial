const express = require('express')
const app = express()
const morgan = require('morgan')

// Require and config dotenv
// This line makes environmental variables available across the app (Check .env file inside root dir)
require('dotenv').config()

// Require db.js file to connect to MongoDB
require('./db.js')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/users.routes'))

// Error handling
app.use((req, res, next) => {
    const error = new Error('Resource not found.')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app