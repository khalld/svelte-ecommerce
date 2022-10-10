const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    phone: Number,
    address: {
        address: String,
        address2: String,
        country: String,
        region: String,
        city: String,
        zip: Number,
    },
    token: String,
    role: String,
    enabled: Boolean
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;