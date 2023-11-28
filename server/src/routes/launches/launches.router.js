const express = require('express')
const { httpGetAllLauches } = require('./launches.controller')
const launchesRouter = express.Router()
launchesRouter.get('/launches', httpGetAllLauches)
module.exports = launchesRouter