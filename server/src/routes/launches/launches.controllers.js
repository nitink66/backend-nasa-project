const {
    getCompleteLaunches,
    addNewLaunch,
} = require('../../models/launches.model');

function getAllLaunches(req, res) {
    console.log('inside all launches');
    return res.status(200).json(getCompleteLaunches());
}

const postNewLaunch = (req, res) => {
    console.log(req.body, 'body');
    const newLaunch = req.body;
    newLaunch.launchDate = new Date(newLaunch.launchDate);
    addNewLaunch(newLaunch);
    res.status(201).json(newLaunch);
};

module.exports = { getAllLaunches, postNewLaunch };
