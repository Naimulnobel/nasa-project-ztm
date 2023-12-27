const launches = new Map();
const axios = require('axios');
const launchesDatabase = require('./lunches.mongo');
const planets = require('./planets.mongo');
const DEFAULT_FLIGHT_NUMBER = 100;
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: " Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "Kepler-442 b",
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

// launches.set(launch.flightNumber, launch);
saveLaunches(launch)

async function loadLaunchData() {
    console.log('Downloading launch data...');
    const response = await axios.post('https://api.spacexdata.com/v4/launches/query', {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1,
                    },
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1,
                    },
                },
            ],
        },
    });

    if (response.status !== 200) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers,
        }
        console.log(`${launch.flightNumber} ${launch.mission}`);
        await saveLaunches(launch);
    }
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}
function getAllLauches() {
    return launchesDatabase.find({}, {
        '_id': 0,
        '__v': 0,
    });
}
async function saveLaunches(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });
    if (!planet) {
        throw new Error('No matching planet found');
    }
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

// function addNewLaunch(launch) {
//     latestFlightNumber++;
//     launches.set(latestFlightNumber, Object.assign(launch, {
//         flightNumber: latestFlightNumber,
//         upcoming: true,
//         success: true,
//         customers: ['ZTM', 'NASA'],
//     }));
// }
async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['ZTM', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunches(newLaunch);
}
function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}
async function abortLaunchById(launchId) {
    const aborted = await launchesDatabase.findOneAndUpdate({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    }, {
        new: true,
    });


    return aborted;
}
module.exports = {
    loadLaunchData,
    getAllLauches,
    // addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch,
}
