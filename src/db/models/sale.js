const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
    code: String,
    amount: Number,
    startAt: Date,
    expireAt: Date
})

const productModel = mongoose.model("sales", saleSchema);

module.exports = productModel;