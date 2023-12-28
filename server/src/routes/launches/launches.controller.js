const { getAllLauches, existsLaunchWithId, abortLaunchById, scheduleNewLaunch } = require('../../models/launches.model')
const { getPagination } = require('../../services/query')

async function httpGetAllLauches(req, res) {
    let { skip, limit } = getPagination(req.query)
    page = +page
    limit = +limit
    const launches = await getAllLauches(skip, limit)
    return res.status(200).json(launches)
}
async function httpAddNewLaunch(req, res) {
    const launch = req.body
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property'
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}
async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)
    const aborted = await abortLaunchById(launchId)
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not found'
        })
    }
    return res.status(200).json(aborted)
}
module.exports = {
    httpGetAllLauches,
    httpAddNewLaunch,
    httpAbortLaunch
}
