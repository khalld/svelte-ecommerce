const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    data: Date,
    products: Array,
    code: String,
    sales: [],
    customer: {
        _id: String,
        email: String,
        name: String,
        surname: String,
        phone: Number
    },
    address: {
        address: String,
        address2: String,
        country: String,
        region: String,
        city: String,
        zip: Number
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