const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: true }))
const planetsRouter = require('./routes/planets/planets.router')
app.use(planetsRouter)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
module.exports = app