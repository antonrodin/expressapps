const Sequelize = require('sequelize');
const db = require('../database');

const Provincia = db.define('provincias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    capital_id: {
        type: Sequelize.INTEGER
    },
    comunidad_id: {
        type: Sequelize.INTEGER
    },
    provincia: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

module.exports = Provincia;