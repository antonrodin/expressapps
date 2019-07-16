const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

// Settings
const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Make public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/members', require('./routes/api/members'));

app.listen(PORT, () => console.log(`The app is started on: http://localhost:${PORT}`));