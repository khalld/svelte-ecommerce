const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    description: String,
    pos: Number,
    link: String,
})

const productModel = mongoose.model("categories", categorySchema);

module.exports = productModel;