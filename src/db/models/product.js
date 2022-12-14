const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    code: String,
    description: String,
    longDescription: String,
    price: Number,
    category: Array,
    quantity: Number,
    enabled: Boolean
})

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;