import mongoose from "mongoose";

const Schema = mongoose.Schema;

const saleSchema = new Schema({
    name: String,
    code: String,
    startAt: Date,
    expireAt: Date
    
})

export default saleSchema;