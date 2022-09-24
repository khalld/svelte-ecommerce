const express = require("express");
const router = express.Router();
const Category = require('../db/models/category.js');

// Get list all elements
router.get('', async (req, res) => {
    try {
        const categories = await Category.find()
        res.send(categories)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }
})

// Get specific element
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id})
        
        if (category == null){
            throw new Error(`Category with _id ${req.params.id} not founded!`)
        }

        res.send(category)
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Add new element
router.post('', async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.send(category);
    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// Edit an existing element
router.post('/:id', async (req, res) => {
    try {
        var category = await Category.findOne({_id: req.params.id})

        if (category == null){
            throw new Error(`Category with _id ${req.params.id} not founded!`)
        }

        category.name = req.body.name;
        category.description = req.body.description;
        category.pos = req.body.pos;
        category.link = req.body.link;

        await category.save()
        res.send(category);

    } catch (err) {
        res.status(400)
        res.send({message: err.message})
    }

})

// TODO: add delete

module.exports = router;