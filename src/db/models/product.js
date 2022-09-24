const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    vat: Number,
    category: Array,
    photos: Array,
    enabled: Boolean
})

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;