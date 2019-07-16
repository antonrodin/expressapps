const express = require('express');
const db = require('./database');
const app = express();
const PORT = process.env.PORT || 5000;
const Provincia = require('./models/Provincia');
const Municipio = require('./models/Municipio');

// Autenticate
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Routes
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/municipios', (req, res) => {
    Municipio.findAll({ limit: 10 })
        .then(municipios => res.json(municipios))
        .catch(err => console.log(err));
});

app.get('/provincias', (req, res) => {
    Provincia.findAll()
        .then(provincias => res.json(provincias))
        .catch(err => console.log(err));
});

app.get('/provincias/:id', (req, res) => {
    Provincia.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(provincias => res.json(provincias))
        .catch(err => console.log(err));
});

// Init
app.listen(PORT, function () {
    console.log(`Example app on http://localhost:${PORT}`);
});