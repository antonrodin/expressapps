const express = require('express');
const path = require('path');
const app = express();
const connection = require('./mysql');

// Setings
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Make public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/todos', (req, res) => {
    connection.query("SELECT * FROM tareas ORDER BY id DESC", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/api/todos/filter/:prioridad', (req, res) => {
    connection.query(`SELECT * FROM tareas WHERE prioridad = '${req.params.prioridad}'`, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/api/todos/search/:query', (req, res) => {
    connection.query(`SELECT * FROM tareas WHERE titulo LIKE '%${req.params.query}%'`, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/api/todos/:id', (req, res) => {
    connection.query(`DELETE FROM tareas WHERE id = ${req.params.id}`, function (err, result, fields) {
        if (err) throw err;
        res.json({ msg: `Record with ID = ${req.params.id} is Deleted` });
    });
});

app.post('/api/todos', (req, res) => {

    let sql = `INSERT INTO tareas (titulo, prioridad) VALUES ('${req.body.titulo}', '${req.body.prioridad}')`;

    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });

    res.json({ msg: "1 record inserted" });

    // If error
    // res.status(400).json({ msg: "Hay un problema..." });
});

// Routes
app.listen(PORT, () => console.log(`The app is running at http://localhost:${PORT}`))