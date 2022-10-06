const express = require("express");
const router = express.Router();
const Product = require('../db/models/product.js');

// Get list all elements
router.get('', async (req, res) => {

    const { page = 1, limit = 10 } = req.query;

    try {
        const products = await Product.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Product.countDocuments();

        res.send({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        res.status(400)
        res.send({message: err.message, type: 'error'})
    }
})

// Return only available products
router.get('/enabled', async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    try {
        var products;

        if (page == 0 && limit == 0){
            products = await Product.find({enabled: true})
        } else {
            products = await Product.find({enabled: true})
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
        }


        const count = products.length;

        res.send({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (err) {
        res.status(400)
        res.send({message: err.message, type: 'error'})
    }
})

// Get specific element
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id})

        if (product === null){
            throw new Error(`Not found`)
        }

        res.send(product)
    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }

})


// Dopo un'ordine è necessario aggiornare la quantità dei prodotti
router.post('/updatequantity/:id', async (req, res) => {
    try {
        var product = await Product.findOne({_id: req.params.id})

        if (product === null){
            throw new Error(`Not found`)
        }
        product.quantity -= req.body.quantity
        await product.save()
        res.send({message: 'Quantity updated', type: 'info'})
    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }
})


// Get detail of specific element
router.get('/enabled/:id', async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.params.id, enabled: true})

        if (product === null){
            throw new Error(`Not found`)
        }

        res.send(product)
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
        const all = await Product.find({});

        all.forEach(element => {
            if (element.code === req.body.code)
                throw new Error('Product code already used')
        });
        
        var product = new Product(req.body)
        
        await product.save()
        res.send(product);
    } catch (err) {
        if (err.message === 'Product code already used'){
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
        var product = await Product.findOne({_id: req.params.id})

        if (product === null){
            throw new Error(`Not found`)
        }

        product.name = req.body.name;
        product.code = req.body.code;
        product.description = req.body.description;
        product.longDescription = req.body.longDescription;
        product.price = req.body.price;
        product.category = req.body.category;
        product.photos = req.body.photos;
        product.quantity = req.body.quantity;
        product.enabled = req.body.enabled;

        await product.save()
        res.send(product);

    } catch (err) {
        if (err.message === 'Not found'){
            res.status(404)
        } else {
            res.status(400)
        }
        res.send({message: err.message, type: 'error'})
    }

})

// Delete an existing element
router.delete('/:id', async (req, res) => {
    try {
        var product = await Product.findOneAndRemove({_id: req.params.id})

        if (product == null){
            throw new Error('Not found')
        }
        res.send({message: 'Product deleted successfully!'});

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