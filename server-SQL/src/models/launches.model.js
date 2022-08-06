const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    launchDate: new Date('December 27, 2030'),
    mission: 'Test Mission',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    upcoming: true,
    success: true,
    customer: ['ZTM', 'Kepler'],
};

function getCompleteLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(newLaunch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(newLaunch, {
            flightNumber: latestFlightNumber,
            upcoming: true,
            success: true,
            customer: ['ZeroToMastery', 'Kepler new'],
        })
    );
}

function checkValidFlightNumber(launchFlightID) {
    return launches.has(launchFlightID);
}

function deleteSingleLaunch(launchFlightID) {
    const abortedFlight = launches.get(launchFlightID);
    abortedFlight.upcoming = false;
    abortedFlight.success = false;
    return abortedFlight;
}

launches.set(launch.flightNumber, launch);
// launches.get(100) ==> wil return by key value

module.exports = {
    launches,
    getCompleteLaunches,
    addNewLaunch,
    checkValidFlightNumber,
    deleteSingleLaunch,
};
