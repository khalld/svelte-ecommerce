const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    fullName: String,
    email: String,
    address: Object,
    userId: String
})

const customerModel = mongoose.model("customers", customerSchema);

module.exports = userModel;