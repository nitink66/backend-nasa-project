const mysql = require('mysql');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const dbUsername = process.env.SQLDATABASENAME;
const dbPassword = process.env.SQLDATABASEPASSWORD;

if (!dbUsername) {
    throw new Error('DB_USERNAME environment variables must be set');
}

if (!dbPassword) {
    throw new Error('DB_PASSWORD environment variables must be set');
}

const pool = mysql.createPool({
    host: process.env.SQLDATABASEHOST,
    user: process.env.SQLDATABASEUSER,
    password: process.env.SQLDATABASEPASSWORD,
    database: process.env.SQLDATABASENAME,
    connectionLimit: 500,
    queueLimit: 0,
    waitForConnections: true,
});

const sqlDbConnection = function () {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection);
            // connection.release();
        });
    });
};

function mySqlDbConnection() {
    const connection = mysql.createConnection({
        host: process.env.SQLDATABASEHOST,
        user: process.env.SQLDATABASEUSER,
        password: process.env.SQLDATABASEPASSWORD,
        database: process.env.SQLDATABASENAME,
    });
    connection.connect(function (err) {
        if (err) {
            console.log('Error while establishing connection to mysql', err);
        } else {
            console.log('Connection Successful');
        }
    });
    return connection;
}

module.exports = {
    sqlDbConnection,
    mySqlDbConnection,
};
