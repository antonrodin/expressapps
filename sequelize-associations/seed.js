const sequelize = require('./database/db');
const Park = require('./database/models/Park');
const Puppie = require('./database/models/Puppie');
const Location = require('./database/models/Location');
const Food = require('./database/models/Food');

const parks = [
    { name: 'Fullstack Park' },
    { name: 'Prospect Park' },
    { name: 'Washington Square Park' }
]

const locations = [
    { address: '11th Floor, 5 Hanover Square, NY' },
    { address: '450 Flatbush Ave, Brooklyn' },
    { address: 'Washington Square, NY' }
]

const puppies = [
    {
        firstName: 'Puppy',
        lastName: 'Doggo',
        age: 1
    },
    {
        firstName: 'Pupster',
        lastName: 'Puppo',
        age: 2
    },
    {
        firstName: 'Mr.',
        lastName: 'Puppyface',
        age: 3
    },
    {
        firstName: 'Ham',
        lastName: 'Sandwich',
        age: 1
    },
    {
        firstName: 'Jon',
        lastName: 'MacPuppald',
        age: 2
    },
    {
        firstName: 'Omri',
        lastName: 'Puppstein',
        age: 1
    },
];

const foods = [
    {
        name: 'pizza',
        deliciousness: 4,
    },
    {
        name: 'dumplings',
        deliciousness: 5,
    },
    {
        name: 'lettuce',
        deliciousness: 3,
    },
    {
        name: 'kao soi',
        deliciousness: 5,
    },
    {
        name: 'cheetos',
        deliciousness: 5,
    }
]


sequelize.sync({ force: true }).then(msg => {

    // Seed Locations
    locations.forEach(location => {
        Location.create(location);
    });

    // Seed Parks
    let cont = 1;
    parks.forEach(park => {
        Park.create(park).then(park => {
            park.setLocation(cont);
            cont++;
        });
    });

    // Seed Puppies
    puppies.forEach(puppie => {
        Puppie.create(puppie);
    });

    // Seed Foods
    foods.forEach(food => {
        Food.create(food);
    });

    console.log("The DB is synced");
});