const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if (err) throw err;
    console.log(`Established database connection: http://${process.env.DB_HOST}/${process.env.DB_NAME}`);
});

module.exports = connection;