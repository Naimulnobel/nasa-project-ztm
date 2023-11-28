const express = require('express')
const { httpGetAllLauches, httpAddNewLaunch } = require('./launches.controller')
const launchesRouter = express.Router()
launchesRouter.get('/', httpGetAllLauches)
launchesRouter.post('/', httpAddNewLaunch)
module.exports = launchesRouter