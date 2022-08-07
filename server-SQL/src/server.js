const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { mySqlDbConnection } = require('../utils/sqlConnector');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    // MYSQL CONNECTION
    await mySqlDbConnection();
    await loadPlanetsData();
    server.listen(PORT, () => {
        console.log(`Server is started on PORT : ${PORT}`);
    });
}

startServer();
