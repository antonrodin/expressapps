const Sequelize = require('sequelize');
const sequelize = require('../db');
const Model = Sequelize.Model;

class Location extends Model {}

Location.init({
    address: Sequelize.STRING
}, {

    sequelize,
    modelName: "locations",

    // foreigh keys and timespatm like created_at
    // instead of createdAt
    underscored: true,

})

module.exports = Location;