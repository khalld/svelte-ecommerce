const express = require("express");
const router = express.Router();
const User = require('../db/models/user.js');

// Get list all elements
router.get('', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }
})

// Get specific element
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        res.send(user == null ? {} : user)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Add new element
router.post('', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.send(user);
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Edit an existing element
router.post('/:id', async (req, res) => {
    try {
        var user = await User.findOne({_id: req.params.id})

        if (user == null){
            res.status(400)
            res.send({message: `User with _id ${req.params.id} not founded!`})
        } else {
            user.name = req.body.name;
            user.surname = req.body.surname;
            user.email = req.body.email;
            // user.password
            user.address = []; // FIXME:
            user.token = ""; // FIXME:
            user.role = "admin"; // FIXME:
        }

        await user.save()
        res.send(user);

    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// TODO: recover password

// TODO: edit password

// TODO: login

module.exports = router;