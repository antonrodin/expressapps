const mysql = require('mysql');
const { database } = require('./config');

const connection = mysql.createConnection(database);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Conectado a la base de datos");
});

module.exports = connection;