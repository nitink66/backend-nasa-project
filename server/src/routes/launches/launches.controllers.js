const { launches } = require('../../models/launches.model');

function getAllLaunches(req, res) {
    console.log('inside all launches');
    return res.status(200).json(Array.from(launches.values()));
}

module.exports = { getAllLaunches };
