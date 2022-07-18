import axios from 'axios';

const API_URL = 'http://localhost:2020';

async function httpGetPlanets() {
    let results = await axios.get(`${API_URL}/planets`).then((res) => {
        console.log(res.data);
        return res.data;
    });

    return await results;
}

async function httpGetLaunches() {
    // TODO: Once API is ready.
    // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
    // TODO: Once API is ready.
    // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
