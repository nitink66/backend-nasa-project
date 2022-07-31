const http = require('http');

const app = require('./app');

const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.MONGO_DB_URL;

const server = http.createServer(app);

async function startServer() {
    await mongoose
        .connect(DATABASE_URL)
        .then(async () => {
            console.log('Server has been connected to the Database');

            await loadPlanetsData();
            server.listen(PORT, () => {
                console.log(`Server is started on PORT : ${PORT}`);
            });
        })
        .catch((err) => {
            console.log('Error connecting to the database', err);
        });
}

startServer();
