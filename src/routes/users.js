const express = require("express");
const router = express.Router();
const User = require('../db/models/user.js');
const env = require('../env.js')
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

// default transporter to send all emails
var transporter =  nodemailer.createTransport(env.mail)

router.post('/login', async (req, res) => {
    try {
        var user = await User.findOne({email: req.body.email})
        
        if (user == null){
            throw new Error(`Not found`)
        }

        if (user.enabled === false){
            throw new Error('Disabled')
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            throw new Error(`Wrong password`)
        }

        res.send(user);
    } catch (err) {
        if (err.message === 'Disabled'){
            res.status(409)
        } else if (err.message === 'Not found') {
            res.status(404)
        } else if (err.message === 'Wrong password') {
            res.status(401)
        } else {
            res.status(400)
        }
        
        res.send({message: err.message, type: 'error'})
    }
})

router.post('/changepwd', async (req, res) => {
    try {
        var user = await User.findOne({email: req.body.email})
        
        if (user == null){
            throw new Error(`Not found`)
        }

        if (user.enabled === false){
            throw new Error('Disabled')
        }

        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);

        if(!validPassword) {
            throw new Error(`Wrong password`)
        }

        const salt = await bcrypt.genSalt(10);
        const cryptedPwd = await bcrypt.hash(req.body.newPassword, salt);

        user.password = cryptedPwd;

        await user.save()

        res.status(202);
        res.send({message: 'Password changed successfully', type: 'info'});
    } catch (err) {
        if (err.message === 'Disabled'){
            res.status(409)
        } else if (err.message === 'Not found') {
            res.status(404)
        } else if (err.message === 'Wrong password') {
            res.status(401)
        } else {
            res.status(400)
        }
        
        res.send({message: err.message, type: 'error'})

    }
})

router.post('/recoverpwd', async (req, res) => {
    try {
        var user = await User.findOne({email: req.body.email})
        
        if (user == null){
            throw new Error(`Not found`)
        }

        if (user.enabled === false){
            throw new Error('Disabled')
        }
        const token = uuidv4();
        user.token = token;
        user.enabled = false;

        await user.save()

        var mailOptions = {
            from: env.mail.auth.user,
            to: user.email,
            subject: 'Company Name - Password recovery',
            html: `<h1>Hi ${user.name},</h1><p>it seems that you have forgot your password. Click <a href="${env.client.host}recover/${token}">here</a> to recover your password!<br><br> If you have problem to see the link, copy and paste this link on your browser: http://localhost:5173/recover/${token}</p>`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                throw new Error('Error sending email!')
            }
        });

        res.status(202)
        res.send({message: 'Success', type: 'info'});
    } catch (err) {
        if (err.message === 'Disabled'){
            res.status(409)
        } else if (err.message === 'Not found') {
            res.status(404)
        } else {
            res.status(400)
        }
        
        res.send({message: err.message, type: 'error'})
    }
})

router.post('/recoverpwd/:token', async (req, res) => {
    try {

        if (req.params.token == null){
            throw new Error('Token required')
        }

        var user = await User.findOne({token: req.params.token, enabled: false})

        if (user == null){
            throw new Error(`Not found`)
        }

        const salt = await bcrypt.genSalt(10);
        const cryptedPwd = await bcrypt.hash(req.body.password, salt);

        user.token = null;
        user.password = cryptedPwd;
        user.enabled = true;

        await user.save();

        res.status(202)
        res.send({message: 'Password recovered', type: 'info'});
    } catch (err) {
        if (err.message === 'Not found') {
            res.status(404)
        } else if (err.message === 'Token required') {
            res.status(401)
        } else {
            res.status(400)
        }
        
        res.send({message: err.message, type: 'error'})
    }
})

// Get a paginated list of all users
router.get('', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await User.countDocuments();

        res.send({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }
})

// Get specific user by id
router.get('/:id', async (req, res) => {
    try {
        if (req.params.id == null){
            throw new Error('Id required')
        }

        const userExist = await User.findOne({email: req.body.email})

        if (userExist != null){
            throw new Error(`Email already used`)
        }

        const user = await User.findOne({_id: req.params.id}).select('-password')

        if (user == null){
            throw new Error(`Not found`)
        }
        res.send(user)
    } catch (err) {
        if (err.message === 'Not found') {
            res.status(404)
        } else {
            res.status(400)
        }
        
        res.send({message: err.message, type: 'error'})
    }

})

// Disable or enable a user
router.post('/disable', async (req, res) => {
    try {
        if (req.body.id == null){
            throw new Error('Id required')
        }

        const user = await User.findOne({_id: req.body.id}).select('-password')

        if (user == null){
            throw new Error(`Not found`)
        }

        user.enabled = req.body.enabled;
        await user.save()
        res.send(user)
    } catch (err) {
        if (err.message === 'Not found') {
            res.status(404)
        } else {
            res.status(400)
        }
        
        res.send({message: err.message, type: 'error'})
    }
})

// Register a new user
router.post('', async (req, res) => {
    try {
        const userExist = await User.findOne({email: req.body.email})

        if (userExist != null){
            throw new Error(`Email already used`)
        }

        const salt = await bcrypt.genSalt(10);

        const cryptedPwd = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: cryptedPwd,
            address: req.body.address,
            token: null,
            enabled: true,
            role: "user"
        });
        
        var mailOptions = {
            from: env.mail.auth.user,
            to: user.email,
            subject: 'Company Name - Welcome!',
            html: `<h1>Welcome ${user.name} ${user.surname},</h1><p> we are glad to have you with us!</p>`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("error email", error)
                throw new Error('Error sending email!')
            }
        });

        await user.save()
        res.status(201);
        res.send(user);
    } catch (err) {
        console.error("error:" + err)        
        if (err.message === 'Email already used'){
            res.status(409)
        } else {
            res.status(400)
        }

        res.send({message: err.message, type: 'error'})
    }

})

// Edit an existing element
router.post('/:id', async (req, res) => {
    try {
        var user = await User.findOne({_id: req.params.id})

        if (user == null){
            throw new Error(`Not found`)
        }

        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.address = req.body.address;

        await user.save()
        res.send(user);

    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }

})

module.exports = router;