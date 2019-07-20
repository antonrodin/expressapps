const express = require('express');
const router = express.Router();

const Food = require('../database/models/Food');

// Show all pupies
router.get('/', (req, res) => {
    Food.findAll({ include: { all: true } })
        .then(foods => res.json(foods))
        .catch(err => res.json(err));
});

// Show one puppie
router.get('/:id', (req, res) => {

    // The same as Puppie.findById(req.params.id)
    Food.findOne({
        where: { id: req.params.id },
        include: { all: true }
    })
        .then(food => {
            if (!food) res.json({ msg: "food not found " });
            console.log(food.guau());
            res.json(food);
        })
        .catch(err => res.json(err));
});

module.exports = router;