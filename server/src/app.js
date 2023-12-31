const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.urlencoded({ extended: true }))
const api = require('./routes/api')
app.use('/v1', api)
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})
module.exports = app