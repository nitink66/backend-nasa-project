import axios from 'axios';

const API_URL = 'http://localhost:2021';

async function httpGetPlanets() {
    let results = await axios.get(`${API_URL}/planets`).then((res) => {
        return res.data;
    });

    return await results;
}

async function httpGetLaunches() {
    // TODO: Once API is ready.
    // Load launches, sort by flight number, and return as JSON.
    let results = await axios.get(`${API_URL}/launches`).then((res) => {
        return res.data;
    });
    const fetchedLaunches = await results;

    return fetchedLaunches.sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    });
}

async function httpSubmitLaunch(launch) {
    // TODO: Once API is ready.
    // Submit given launch data to launch system.
    const response = await axios
        .post(`${API_URL}/addNewLaunch`, launch)
        .then((res) => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });
    return response;
}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
    const response = await axios
        .delete(`${API_URL}/deleteLaunch/${id}`)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return false;
        });

    return response;
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
