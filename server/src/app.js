const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/nasa', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: true }))
const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')
app.use('/launches', launchesRouter)
app.use('/planets', planetsRouter)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
module.exports = app