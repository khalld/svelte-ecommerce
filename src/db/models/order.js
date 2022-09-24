const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String, //FIXME: type object id
    address: String,
    products: Array, // FIXME: products
    totalAmount: Number,
    // TODO: add codice sconto
    status: String

})

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;