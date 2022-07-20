const express = require('express');

const launchesRouter = express.Router();

const {
    getAllLaunches,
    postNewLaunch,
    abortMission,
} = require('./launches.controllers');

launchesRouter.get('/launches', getAllLaunches);

launchesRouter.post('/addNewLaunch', postNewLaunch);

launchesRouter.delete('/deleteLaunch/:id', abortMission);

module.exports = launchesRouter;
