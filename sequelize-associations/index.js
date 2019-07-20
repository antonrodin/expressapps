const express = require('express');
const sequelize = require('./database/db');
const puppies = require('./routes/puppies');
const parks = require('./routes/parks');
const foods = require('./routes/foods');

const app = express();

// Setings
const port = process.env.PORT || 5050;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => res.send("Hello World"));
app.use('/api/puppies', puppies);
app.use('/api/parks', parks);
app.use('/api/foods', foods);

app.listen(port, () => {
    
    console.log(`App is started at: http://localhost:${port}`);
    
    // Force:true rewrite the fuck up all database
    // Be carefull my friend
    sequelize.sync({ force: false }).then(msg => {
        console.log("The DB is synced");
    });

});