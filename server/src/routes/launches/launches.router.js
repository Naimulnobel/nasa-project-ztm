const express = require('express')
const { httpGetAllLauches, httpAddNewLaunch, httpAbortLaunch } = require('./launches.controller')
const launchesRouter = express.Router()
launchesRouter.get('/', httpGetAllLauches)
launchesRouter.post('/', httpAddNewLaunch)
launchesRouter.delete('/:id', httpAbortLaunch)
module.exports = launchesRouter