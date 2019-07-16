const Sequelize = require('sequelize');
const db = require('../database');

const Municipio = db.define('municipios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    provincia_id: {
        type: Sequelize.INTEGER
    },
    municipio: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
    latitud: {
        type: Sequelize.FLOAT
    },
    longitud: {
        type: Sequelize.FLOAT
    }
}, {
    timestamps: false
});

module.exports = Municipio;