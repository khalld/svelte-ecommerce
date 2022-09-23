import mongoose from "mongoose";
import orderSchema from "./order";
import productSchema from "./product";
import saleSchema from "./sale";
import userSchema from "./user";

const orderModel = mongoose.model("orders", orderSchema);
const productModel = mongoose.model("products", productSchema);
const saleModel = mongoose.model("sales", saleSchema);
const userModel = mongoose.model("users", userSchema);

export default { orderModel, productModel, saleModel, userModel}