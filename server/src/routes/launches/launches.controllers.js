const {
    getCompleteLaunches,
    addNewLaunch,
    checkValidFlightNumber,
    deleteSingleLaunch,
} = require('../../models/launches.model');

const DataBase = require('../../../db/Database');

const { testQuery } = require('../../../db/queries/index');

const db = new DataBase();

async function getAllLaunches(req, res) {
    console.log('inside all launches', testQuery());
    const dbResponse = await db.execute(testQuery());
    console.log(dbResponse, '------------------------dbResponse');
    return res.status(201).json(dbResponse);
    // return res.status(200).json(getCompleteLaunches());
}

const postNewLaunch = (req, res) => {
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
        newLaunch.launchDate = new Date(newLaunch.launchDate);
        addNewLaunch(newLaunch);
        res.status(201).json(newLaunch);
    }
};

const abortMission = (req, res) => {
    const launchID = Number(req.params.id);
    console.log(launchID);
    if (!launchID) {
        return res.status(400).json({ error: 'Missing Flight ID' });
    }

    if (!checkValidFlightNumber(launchID)) {
        return res.status(404).json({ error: 'Flight Number not Found' });
    } else if (deleteSingleLaunch(launchID)) {
        return res.status(200).json({ success: 'Successfully Aborted' });
    }
};

module.exports = { getAllLaunches, postNewLaunch, abortMission };
