const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const planetsRouter = require('./routes/planets/planets.router')
app.use(planetsRouter)

module.exports = app