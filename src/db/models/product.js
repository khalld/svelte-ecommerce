import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    vat: Number,
    category: Array,
    enabled: Boolean
})

export default productSchema;