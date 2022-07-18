const { planets } = require('../../models/planets.model');

function getAllPlanets(req, res) {
    console.log(planets.length);
    return res.status(200).json(planets);
}

module.exports = {
    getAllPlanets,
};
