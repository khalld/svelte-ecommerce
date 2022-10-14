// Necessario per runnare assieme al client
// import { handler } from "../client/build/handler.js";
const express = require("express");
const app = express();
const env = require('./src/env.js');
const {connectToDb} = require('./src/db/connection.js')
const userRoute = require("./src/routes/users.js");
const productRoute = require("./src/routes/products.js");
const orderRoute = require("./src/routes/orders.js");
const imgRoute = require("./src/routes/images.js");

connectToDb();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/images", imgRoute);


app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`); 
});