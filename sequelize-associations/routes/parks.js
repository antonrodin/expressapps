const express = require('express');
const router = express.Router();
const Park = require('../database/models/Park');
const Location = require('../database/models/Location');

// Show all parks
router.get('/', (req, res) => {
    Park.findAll({ include: { model: Location } })
        .then(parks => res.json(parks))
        .catch(err => res.json(err));
});

// Show one park
router.get('/:id', (req, res) => {

    Park.findOne( { 
        where: { id: req.params.id }, 
        include: { model: Location } })
    .then(park => {
        if(!park) res.json({ msg: "Park not found "});
        res.json(park);
    })
    .catch(err => res.json(err));
});

// Create Park
router.post('/', (req, res) => {
   
    Park.create(req.body)
        .then(park => {
            res.json({ msg: "Park is created", park: park });
        }).catch(err => {
            res.json({ msg: err })
        });
    
});

// Update Location of a park
router.put('/:id/location', (req, res) => {

    Park.findOne( { where: { id: req.params.id } })
        .then(park => {
            if(!park) res.status('404').json({ msg: "Park not found" });
        
            console.log(req.body);

            park.setLocation(req.body.location_id);
            res.json(park);

        }).catch(err => {
            res.json({ msg: err })
        });

});

module.exports = router;