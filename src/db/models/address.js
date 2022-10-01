const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    name: String,
    description: String,
    pos: Number,
    link: String,
})

const addressModel = mongoose.model("address", addressSchema);

module.exports = addressModel;