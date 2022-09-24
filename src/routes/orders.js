const express = require("express");
const router = express.Router();
const Order = require('../db/models/order.js');

// Get list all elements
router.get('', async (req, res) => {
    try {
        const orders = await Order.find()
        res.send(orders)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }
})

// Get specific element
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({_id: req.params.id})

        if (order == null){
            throw new Error(`Order with _id ${req.params.id} not founded!`)
        }

        res.send(order)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
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
        res.send({message: err.message})
    }

})

// Edit an existing element
router.post('/:id', async (req, res) => {
    try {
        var order = await Order.findOne({_id: req.params.id})

        if (order == null){
            throw new Error(`Order with _id ${req.params.id} not founded!`)
        }

        order.userId = req.body.userId;
        order.address = req.body.address;
        order.products = req.body.products;
        order.totalAmount = req.body.totalAmount;
        order.status = req.body.status;

        await order.save()
        res.send(order);

    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// TODO: add delete



module.exports = router;