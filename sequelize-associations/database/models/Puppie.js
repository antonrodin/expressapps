const Sequelize = require('sequelize');
const sequelize = require('../db');
const Model = Sequelize.Model;

class Puppie extends Model {

    // Class Methods
    static findByFood(food) {
        return this.findAll({
            where: {
                favoriteFood: food
            }
        })
    }

    // Class method for count all 
    // Count all puppies
    // Class method for count all 
    static countPuppies() {
        return this.findAll().then(puppies => puppies.length);
    }

    // Instance Method
    guau() {
        return "Guau from " + this.fullName;
    }

    // Get Method
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    
}
Puppie.init({
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    age: {
        type: Sequelize.INTEGER
    }
}, {
        sequelize,
        modelName: 'puppies',

        // foreigh keys and timespatm like created_at
        // instead of createdAt
        underscored: true
    });

module.exports = Puppie;