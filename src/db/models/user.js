const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    address: Array, // usa uno schema ?
    orders: Array,  // array dei soli id? forse può essere anche eliminato
    token: String,
    role: String
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;