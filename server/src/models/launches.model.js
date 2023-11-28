const launches = new Map();
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: " Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    destination: "kepler-442 b",
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);
function getAllLauches() {
    return Array.from(launches.values());
}

module.exports = {
    getAllLauches,
}
