// Necessario per runnare assieme al client
// import { handler } from "../client/build/handler.js";
const express = require("express");
const app = express();
const env = require('./env.js');
const userModel = require("./db/models/user.js");
const {connectToDb} = require('./db/connection.js')
const userRoute = require("./routes/users");

// necessario per runnare assieme al client
// app.use(handler)

connectToDb(() => {
    console.log("This is a callback!")
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/users", userRoute);

app.get("/pippo", async (req, res) => {
    
    const users = await userModel.find()
    res.send(users);
})



app.listen(env.port, () => {
    console.log(`Now listening on port ${env.port}`); 
});
