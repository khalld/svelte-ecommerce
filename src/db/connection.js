const mongoose = require("mongoose");
const env = require('../env.js');

const uri = `mongodb+srv://${env.db.usr}:${env.db.pwd}@${env.db.deploy}.nrnquyl.mongodb.net/svelte-ecommerce?retryWrites=true&w=majority`;

module.exports = {
    connectToDb: (callback) => {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        try {
            mongoose.connect(uri, connectionParams)
            .then(callback)
            console.log("Database connected successfully!")
        } catch (error) {
            console.log("Database connection failed!")
            console.log(error);
        }
    },
}
