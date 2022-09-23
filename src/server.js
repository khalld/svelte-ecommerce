import express from "express";
// import { handler } from "../client/build/handler.js";
const app = express();

const env = {
    port: 3000
}

app.listen(env.port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${env.port}`); 
});

// app.use(handler)

app.get("/pippo", (req, res) => {

    res.json({message: "pippooo!"})
    res.sendStatus(200)
})