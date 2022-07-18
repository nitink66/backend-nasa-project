const express = require('express');

const launchesRouter = express.Router();

const { getAllLaunches } = require('./launches.controllers');

launchesRouter.get('/launches', getAllLaunches);

// launchesRouter.get('/planets', getAllLaunches);

module.exports = launchesRouter;
