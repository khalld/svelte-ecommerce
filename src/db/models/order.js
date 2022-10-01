const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: String, //FIXME: type object id
    email: String,
    address: {
        address: String,
        address2: String,
        country: String,
        region: String,
        zip: Number,
    },
    customerName: String,
    products: Array, // FIXME: products
    amount: Number,
    discount: Object,
    tracking: Object,
    notes: String,
    data: Date,
    status: String

})

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;