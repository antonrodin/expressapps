var express = require('express');
var app = express();
const pacientes = [
	{ nombre: "Anton", diagnostico: "Gripe" },
	{ nombre: "David", diagnostico: "Resfriado" }
];

// Settings
const port = process.env.PORT || 5000;

// Middleware

// Routes
app.get('/', (req, res) => res.send('hello world'));
app.get('/pacientes', (req, res) => res.json(pacientes)); 

// Start Server
app.listen(port, () => console.log(`Example app on http://localhost:${port}`))
