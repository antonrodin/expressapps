const Sequelize = require('sequelize');
const { database } = require('./config');

const db = new Sequelize(
    database.database,
    database.username, database.password, {
        host: database.host,
        dialect: 'mariadb'
});

module.exports = db;