const Sequelize = require('sequelize');
const sequelize = require('../db');
const Model = Sequelize.Model;

class Food extends Model { }

Food.init({
    name: {
        type: Sequelize.STRING,
    },
    deliciousness: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5,
        }
    }
}, {

        sequelize,
        modelName: "foods",

        // foreigh keys and timespatm like created_at
        // instead of createdAt
        underscored: true,

    })

module.exports = Food;