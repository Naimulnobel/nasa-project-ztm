const { getAllLauches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model')

async function httpGetAllLauches(req, res) {
    return res.status(200).json(getAllLauches())
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
    addNewLaunch(launch)
    return res.status(201).json(launch)
}
function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)
    const aborted = abortLaunchById(launchId)
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