const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String, //FIXME: type object id
    email: String,
    address: String,
    products: Array, // FIXME: products
    amount: Number,
    // TODO: add codice sconto
    // TODO: data
    tracking: Object,
    notes: String,
    data: Date,
    status: String

})

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;