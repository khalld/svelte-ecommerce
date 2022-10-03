// Necessario per runnare assieme al client
// import { handler } from "../client/build/handler.js";
const express = require("express");
const app = express();
const env = require('./env.js');
const {connectToDb} = require('./db/connection.js')
const userRoute = require("./routes/users.js");
const productRoute = require("./routes/products.js");
const orderRoute = require("./routes/orders.js");

// necessario per runnare assieme al client
// app.use(handler)

connectToDb();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

app.listen(env.port, () => {
    console.log(`Server listening on port ${env.port}`); 
});