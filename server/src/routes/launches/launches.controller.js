const { getAllLauches } = require('../../models/launches.model')

async function httpGetAllLauches(req, res) {
    return res.status(200).json(getAllLauches())
}
module.exports = {
    httpGetAllLauches,
}
