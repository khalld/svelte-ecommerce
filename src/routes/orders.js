const express = require("express");
const router = express.Router();
const Order = require('../db/models/order.js');
const { v4: uuidv4 } = require('uuid');
const env = require('../env.js')
const nodemailer = require('nodemailer');

// default transporter to send all emails
var transporter =  nodemailer.createTransport(env.mail)


// Get paginated list of all orders
router.get('', async (req, res) => {

    const { page = 1, limit = 10 } = req.query;

    try {
        const orders = await Order.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Order.countDocuments();

        res.send({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        res.status(404)
        res.send({message: err.message, type: 'error'})
    }
})

// Get specific order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({_id: req.params.id})

        if (order === null){
            throw new Error(`Not found`)
        }

        res.send(order)
    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }

})

// Get specific order by code
router.get('/code/:code', async (req, res) => {
    try {
        const order = await Order.findOne({code: req.params.code})

        if (order === null){
            throw new Error(`Not found`)
        }

        res.send(order)
    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }
})

// Get a paginated list of orders filtered by user id
router.get('/user/:id', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        var orders = await Order.find({'customer._id': req.params.id} )
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Order.find({'customer._id': req.params.id} ).countDocuments()

        if (orders === null){
            throw new Error(`Not found`)
        }

        res.send({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }

})

// Add new element
router.post('', async (req, res) => {
    try {
        var order = new Order(req.body);
        order.code = uuidv4();
        order.shipment.trackingId = null;

        await order.save()

        var mailOptions = {
            from: env.mail.auth.user,
            to: order.customer.email,
            subject: `Company Name - Order ${order.code}`,
            html: `<h1>Hi ${order.customer.name},</h1><p>we are glad that you choose us! <a href="${env.client.host}findorder/${order.code}">Here</a> you can check the status of your order <br><br>If you have problem to see the link, copy and paste this link on your browser: ${env.client.host}findorder/${order.code}</p>`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                throw new Error('Error sending email!')
            }
        });

        res.send(order);
    } catch (err) {
        res.status(400)
        res.send({message: err.message, type: 'error'})
    }

})

// Edit an existing element. Is possible change only status and tracking information
router.post('/:id', async (req, res) => {

    try {
        var order = await Order.findOne({_id: req.params.id})

        if (order === null){
            throw new Error(`Not found`)
        }

        // some logical base controls to avoid illogical status
        if ((order.status == "DELIVERED" || order.status == "SHIPPED") && (req.body.status == "REJECTED" || req.body.status == "PENDING")){
            throw new Error("That's bad!")
        }

        if ((order.status == "PENDING" || order.status == "REJECTED") && req.body.status == "RETURNED" || req.body.status == "DELIVERED" ){
            throw new Error("That's bad!")
        }

        order.status = req.body.status;
        order.shipment.trackingId = req.body.shipment.trackingId;

        await order.save()

        // Send email to confirm that the order was shipped or rejected
        if (order.status == "PENDING" && (req.body.status == "REJECTED" || req.body.status == "SHIPPED")){
            var mailOptions = {
                from: env.mail.auth.user,
                to: order.customer.email,
                subject: `Company Name - Changed status of order ${order.code}`,
                html: `<h1>Hi ${order.customer.name},</h1><p>it seems that the status of your order changed. Click <a href="${env.client.host}findorder/${order.code}">here</a> to check the current status!<br><br>If you have problem to see the link, copy and paste this link on your browser: ${env.client.host}findorder/${order.code}</p>`
            }
    
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    throw new Error('Error sending email!')
                }
            });

        }

        res.send(order);

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