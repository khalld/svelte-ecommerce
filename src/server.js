// Necessario per runnare assieme al client
// import { handler } from "../client/build/handler.js";
const express = require("express");
const app = express();
const env = require('./env.js');
const userModel = require("./db/models/user.js");
const {connectToDb} = require('./db/connection.js')

// necessario per runnare assieme al client
// app.use(handler)



connectToDb();

app.use(express.urlencoded({ extent: false }));
app.use(express.json());

app.get("/pippo", async (req, res) => {
    
    const users = await userModel.find()
    res.send(users);
})



app.listen(env.port, () => {
    console.log(`Now listening on port ${env.port}`); 
});
