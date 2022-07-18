const launches = new Map();

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

launches.set(launch.flightNumber, launch);
// launches.get(100) ==> wil return by key value

module.exports = { launches };
