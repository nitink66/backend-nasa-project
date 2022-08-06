const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const planets = [];

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
                    console.log('save', data.kepler_name);
                    savePlanet(data);
                }
            })
            .on('error', (error) => {
                reject(error);
                console.log('error ---', error);
            })

            .on('end', async () => {
                const planetsFound = (await getAllPlanetsFromMongo()).length;
                console.log(
                    'Read successful',
                    `${planetsFound} planets found `
                );

                resolve();
            });
    });
}

const getAllPlanetsFromMongo = async () => {
    const result = await planets.find({});
    console.log('result', result);
    return result;
};

async function savePlanet(data) {
    console.log(data.kepler_name);
    try {
        await planets.updateOne(
            {
                keplerName: data.kepler_name,
            },
            {
                keplerName: data.kepler_name,
            },
            {
                upsert: true,
            }
        );
    } catch (err) {
        console.log(`Unable to Create/Save Planets - ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
    planets,
};
