const Sequelize = require('sequelize');
const sequelize = require('../db');
const Model = Sequelize.Model;

class Park extends Model {}

Park.init({
  name: Sequelize.STRING
}, {

    sequelize,
    modelName: "parks",

    // foreigh keys and timestamp like created_at
    // instead of createdAt
    underscored: true,

})

module.exports = Park;