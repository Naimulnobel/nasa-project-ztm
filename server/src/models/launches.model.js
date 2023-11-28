const launches = new Map();
let latestFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: " Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "kepler-442 b",
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);
function getAllLauches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        upcoming: true,
        success: true,
        customer: ['ZTM', 'NASA'],
    }));
}

module.exports = {
    getAllLauches,
    addNewLaunch,
}
