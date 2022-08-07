const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const {
    insertIntoPlanetsDB,
    getAllPlanetsDBQuery,
} = require('../../db/queries/planets');

const DataBase = require('../../db/Database');

const db = new DataBase();

function isHabitable(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    );
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(
            path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')
        )
            .pipe(
                parse({
                    comment: '#',
                    columns: true,
                })
            )
            .on('data', async (data) => {
                if (isHabitable(data)) {
                    await savePlanet(data);
                }
            })
            .on('error', (error) => {
                reject(error);
                console.log('error ---', error);
            })

            .on('end', async () => {
                const planetsFound = await db.execute(getAllPlanetsDBQuery());

                console.log(
                    'Read successful',
                    `${planetsFound.rowCount} planets found `
                );

                resolve();
            });
    });
}

async function savePlanet(data) {
    try {
        return db.execute(insertIntoPlanetsDB(data));
    } catch (err) {
        console.log(`Unable to Create/Save Planets - ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
};
