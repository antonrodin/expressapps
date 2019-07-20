const express = require('express');
const router = express.Router();
const Puppie = require('../database/models/Puppie');
const Food = require('../database/models/Food');

// Bind the puppie to ID
router.param('id', (req, res, next, id) => {
    
    // Find
    Puppie.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(puppie => {
        if (!puppie) res.status(404).json({ msg: "Puppie not found " });
        req.puppie = puppie;
        next();
    })
    .catch(err => {
        next(err);
    });

});

// Show all pupies
router.get('/', (req, res) => {
    Puppie.findAll({ include: { all: true } })
        .then(puppies => res.json(puppies))
        .catch(err => res.json(err));
});

// Show one puppie
// Example of how to use route.param()...
// ¡Awesome!
router.get('/:id', (req, res) => {
    res.json(req.puppie);
});

// Find by Food
router.get('/food/:food', (req, res) => {
    Puppie.findByFood(req.params.food)
        .then(puppie => res.json(puppie))
        .catch(err => res.json(err));
});

// Create Puppie
router.post('/', (req, res) => {
    Puppie.create(req.body)
        .then(puppie => {
            res.json({ msg: "Puppie is created", puppie: puppie });
        }).catch(err => {
            res.json({ msg: err })
        });
});

router.put('/:id/friend', (req, res) => {
    Puppie.findOne({
        where: { id: req.params.id },
        include: { all: true }
    })
    .then(puppie => {
        if (!puppie) res.status(404).json({ msg: "Puppie not found" })

        puppie.setFriend(req.body.id);
        res.json(puppie);

        // Puppie.create({ firstName: "Ms.", lastName: "Peper", age: 4}).then(friend => {
        //     puppie.setFriend(friend).then(puppie => {
        //         res.json({ msg: "Food is added", puppie: puppie });
        //     })
        // });
    
    });
});

// Create new food
router.post('/:id/food', (req, res) => {


    Puppie.findOne({
        where: { id: req.params.id },
        include: { model: Food }
    })
        .then(puppie => {
            if (!puppie) res.status(404).json({ msg: "Puppie not found" })

            puppie.createFood(req.body).then(food => {
                res.json({ food, puppie });
            });
            

            // Food.create(req.body).then(food => {
            //     puppie.addFood(food).then(puppie => {
            //         res.json({ msg: "Food is added", puppie: puppie });
            //     })
            // });
            
        }).catch(err => {
            res.json({ msg: err })
        });

    

});

module.exports = router;