const express = require('express');
const members = require('../../Members');
const router = express.Router();

// Get all members
router.get('/', (req, res) => {
    res.json(members);
});

// Get a member
router.get('/:id', (req, res) => {

    let found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(elem => elem.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Member widh ID: ${req.params.id} not found`})
    }
});

// Create a member
router.post('/', (req, res) => {
    let member = {
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!member.name || !member.email) {
        res.status(400).json({ msg: `Send correct name & email`})
    } else {
        members.push(member);
        res.json(members);
    }
});

// Update a member
router.put('/:id', (req, res) => {

    let found = members.some(member => member.id === parseInt(req.params.id));
    let foundMember = {};

    if(found) {

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = (req.body.name) ? req.body.name : member.name;
                member.email = (req.body.email) ? req.body.email : member.email;

                res.json({ msg: `Member with ID ${req.params.id} is updated`, member: member });
            }
        });

    } else {
        res.status(400).json({ msg: `Member widh ID: ${req.params.id} not found`})
    }
});

// Delete a member
router.delete('/:id', (req, res) => {

    let found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json( { 
            msg: `Member with ID ${req.params.id} is deleted`,
            members: members.filter(elem => elem.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ msg: `Member widh ID: ${req.params.id} not found`})
    }
});

module.exports = router;