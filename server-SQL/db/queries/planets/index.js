const insertIntoPlanetsDB = (kepler_data) =>
    `INSERT IGNORE INTO planets(keplerName) VALUES('${kepler_data.kepler_name}')`;

const getAllPlanetsDBQuery = () => `SELECT * FROM planets ORDER BY id ASC; `;

module.exports = {
    insertIntoPlanetsDB,
    getAllPlanetsDBQuery,
};
