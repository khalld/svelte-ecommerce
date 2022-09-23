import express from "express";
// import { handler } from "../client/build/handler.js";
import mongoose from "mongoose";
const app = express();
import env from './env.js'

const uri = `mongodb+srv://${env.db.usr}:${env.db.pwd}@${env.db.db}.nrnquyl.mongodb.net/?retryWrites=true&w=majority`;


app.listen(env.port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${env.port}`); 
});

// app.use(handler)

app.get("/pippo", async (req, res) => {
    
    // await mongoose.connect(uri)
    //     .then(resp => {
    //         console.log(resp)
    //     })
    //     .catch(err => console.log(err))
        
    res.json({message: "pippooo!"})
})