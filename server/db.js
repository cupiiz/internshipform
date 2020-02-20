const mysql = require('mysql');

//local mysql db connection
const connection = mysql.createPool({
    connectionLimit: 10,
    password: 'tecmove108',
    user: 'root',
    database: 'therunway_internship',
    host: 'localhost',
    port: '3306'
});

module.exports = connection;