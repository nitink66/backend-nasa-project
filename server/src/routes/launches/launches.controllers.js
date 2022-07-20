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

module.exports = { getAllLaunches, postNewLaunch };
