const getAllLaunchesDBQuery = () => `SELECT * FROM launches ORDER BY id ASC`;

const addNewLaunchDBQuery = (newLaunch) => {
    const {
        flightNumber,
        launchDate,
        mission,
        rocket,
        target,
        upcoming,
        success,
    } = newLaunch;
    return `INSERT IGNORE INTO launches(flightNumber,launchDate,mission,rocket,target,upcoming,success) VALUES(
        ${flightNumber},'${launchDate}','${mission}','${rocket}','${target}',${upcoming},${success})`;
};

const checkValidFlightNumberFromDB = (flightNumber) => {
    return `SELECT * FROM launches where flightNumber=${flightNumber}`;
};
const abortLaunchDBQuery = (flightNumber) => {
    return `UPDATE launches SET upcoming=false ,success=false WHERE flightNumber=${flightNumber}`;
};

module.exports = {
    getAllLaunchesDBQuery,
    addNewLaunchDBQuery,
    checkValidFlightNumberFromDB,
    abortLaunchDBQuery,
};
