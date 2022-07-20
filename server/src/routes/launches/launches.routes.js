const express = require('express');

const launchesRouter = express.Router();

const { getAllLaunches, postNewLaunch } = require('./launches.controllers');

launchesRouter.get('/launches', getAllLaunches);

launchesRouter.post('/addNewLaunch', postNewLaunch);

module.exports = launchesRouter;
