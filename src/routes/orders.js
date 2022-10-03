const express = require("express");
const router = express.Router();
const Order = require('../db/models/order.js');

// Get list all elements
router.get('', async (req, res) => {
    try {
        const orders = await Order.find()
        res.send(orders)
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

// Add new element
router.post('', async (req, res) => {
    try {
        const order = new Order(req.body)
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