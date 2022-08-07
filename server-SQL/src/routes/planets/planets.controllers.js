const DataBase = require('../../../db/Database');
const db = new DataBase();

const { getAllPlanetsDBQuery } = require('../../../db/queries/planets/index');

async function getAllPlanets(req, res) {
    const allPlanets = await db.execute(getAllPlanetsDBQuery());
    return res.status(200).json(allPlanets.rows);
}

module.exports = {
    getAllPlanets,
};
