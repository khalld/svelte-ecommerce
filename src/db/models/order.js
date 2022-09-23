const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    address: Array, // usa uno schema ?
    orders: Array,  // array dei soli id? forse può essere anche eliminato
    token: String
})

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;