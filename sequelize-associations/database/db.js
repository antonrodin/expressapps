const Sequelize = require('sequelize');
const { database } = require('../config');

// Settings
const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: 'mysql'
    });

module.exports = sequelize;

const Puppie = require('./models/Puppie');
const Park = require('./models/Park');
const Food = require('./models/Food');
const Location = require('./models/Location');

// Many to many relationship
Puppie.belongsToMany(Food, { through: "PuppieFood" });
Food.belongsToMany(Puppie, { through: "PuppieFood" });

// To the same relationship
Puppie.belongsTo(Puppie, { as: "friend" });

// One to one relationship
Park.belongsTo(Location);

// Parks and Puppies
Puppie.belongsTo(Park);
Park.hasMany(Puppie);