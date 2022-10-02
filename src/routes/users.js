const express = require("express");
const router = express.Router();
const User = require('../db/models/user.js');
const bcrypt = require("bcrypt");

router.post('/login', async (req, res) => {
    try {
        var user = await User.findOne({email: req.body.email})
        
        if (user == null){
            throw new Error(`User not founded`)
        }

        if (user.enabled === false){
            throw new Error('User is disabled!')
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            throw new Error(`Wrong password!`)
        }

        res.send(user);
    } catch (err) {
        if (err.message === 'User is disabled!'){
            res.status(409)
            res.send({message: err.message})
        } else {
            res.status(400)
            res.send({message: err.message})
        }

    }
})

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
        if (req.params.id == null){
            throw new Error('Must pass a valid _id!')
        }

        const user = await User.findOne({_id: req.params.id}).select('-password')

        if (user == null){
            throw new Error(`User with _id ${req.params.id} not founded!`)
        }
        res.send(user)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Add new element
router.post('', async (req, res) => {
    try {
        const userExist = await User.findOne({email: req.body.email})

        if (userExist != null){
            throw new Error(`User with email ${req.body.email} already exist`)
        }

        const salt = await bcrypt.genSalt(10);

        const cryptedPwd = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: cryptedPwd,
            address: req.body.address,
            orders: [],
            token: null, // TODO:
            enabled: false,
            role: "admin" // TODO:

        });
        
        await user.save()
        return res.send(user);
    } catch (err) {
        res.status(400)
        return res.send({message: err.message})
    }

})

// Edit an existing element
router.post('/:id', async (req, res) => {
    try {
        var user = await User.findOne({_id: req.params.id})

        if (user == null){
            throw new Error(`User not founded`)
        }

        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        // user.password
        user.address = []; // FIXME:
        user.token = ""; // FIXME:
        user.role = "admin"; // FIXME:

        await user.save()
        res.send(user);

    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})


// TODO: recover password

// TODO: edit password

// TODO: add disable user

module.exports = router;