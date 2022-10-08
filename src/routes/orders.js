const express = require("express");
const router = express.Router();
const Order = require('../db/models/order.js');
const { v4: uuidv4 } = require('uuid');

// Get list all elements
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

// Get specific element
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

// Get specific element by code
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


// Get all orders from by
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
        await order.save()
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

        order.status = req.body.status;
        order.tracking = req.body.tracking;

        await order.save()
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