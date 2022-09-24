const express = require("express");
const router = express.Router();
const Product = require('../db/models/product.js');

// Get list all elements
router.get('', async (req, res) => {
    try {
        const users = await Product.find()
        res.send(users)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }
})

// Get specific element
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})

        if (product == null){
            throw new Error(`Product with _id ${req.params.id} not founded!`)
        }

        res.send(product)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Add new element
router.post('', async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.send(product);
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Edit an existing element
router.post('/:id', async (req, res) => {
    try {
        var product = await Product.findOne({_id: req.params.id})

        if (product == null){
            throw new Error(`Product with _id ${req.params.id} not founded!`)
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.vat = req.body.vat;
        product.category = req.body.category;
        product.photos = req.body.photos;
        product.enabled = req.body.enabled;

        await product.save()
        res.send(product);

    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// TODO: add delete

module.exports = router;