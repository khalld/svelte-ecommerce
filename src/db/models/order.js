const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    data: Date,
    products: Array, // FIXME: products
    sales: [],
    customer: {
        _id: String, //FIXME: type object id
        email: String,
        name: String,
        surname: String,
    },
    address: {
        address: String,
        address2: String,
        country: String,
        region: String,
        zip: Number,
    },
    tracking: {
        id: String,
        provider: String,
    },
    amount: Number,
    notes: String,
    status: String
})

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;