const {
    getAllLaunchesDBQuery,
    addNewLaunchDBQuery,
    abortLaunchDBQuery,
    checkValidFlightNumberFromDB,
} = require('../../../db/queries/launches');

const DataBase = require('../../../db/Database');

const db = new DataBase();

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getAllLaunches(req, res) {
    const dbResponse = await db.execute(getAllLaunchesDBQuery());
    return res.status(201).json(dbResponse.rows);
}

const postNewLaunch = async (req, res) => {
    console.log(req.body, 'body');
    const newLaunch = req.body;
    console.log('isNaN(newLaunch.launchDate)', isNaN(newLaunch.launchDate));

    if (
        !newLaunch.mission ||
        !newLaunch.rocket ||
        !newLaunch.target ||
        !newLaunch.launchDate
    ) {
        res.status(400).json({
            error: 'Missing Required Fields',
        });
    }
    // else if (newLaunch.launchDate.toString() === 'Invalid Date') {
    //     return res.status(400).json({
    //         error: 'Invalid Date',
    //     });
    // }
    else {
        // newLaunch.launchDate = newLaunch.launchDate;
        newLaunch.flightNumber = getRandomNumberBetween(100, 500);
        newLaunch.upcoming = true;
        newLaunch.success = true;
        newLaunch.customer = ['ZeroToMastery', 'Kepler new'];
        await db.execute(addNewLaunchDBQuery(newLaunch));
        res.status(201).json(newLaunch);
    }
};

const abortMission = async (req, res) => {
    const launchID = Number(req.params.id);
    console.log(launchID);
    if (!launchID) {
        return res.status(400).json({ error: 'Missing Flight ID' });
    } else if (launchID) {
        const result = await db.execute(checkValidFlightNumberFromDB(launchID));
        if (result.rowCount === 0) {
            return res.status(400).json({ error: 'Flight Number not Found' });
        } else {
            await db.execute(abortLaunchDBQuery(launchID));
            return res.status(200).json({ success: 'Successfully Aborted' });
        }
    }
};

module.exports = { getAllLaunches, postNewLaunch, abortMission };
