const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.routes');
const launchesRouter = require('./routes/launches/launches.routes');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
);

app.use(morgan('short'));

app.use(planetsRouter);
app.use(launchesRouter);

module.exports = app;
