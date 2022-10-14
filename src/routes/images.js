const express = require("express");
const router = express.Router();
const Order = require('../db/models/order.js');
const { v4: uuidv4 } = require('uuid');
const env = require('../env.js')
const multer = require('multer');
const path = require("path");
const fs = require("fs");

const DIR = 'uploads';
var upload = multer({ storage: storage });

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

router.post('/upload', upload.single('image'),(req, res) => {
    const image = req.image;
    res.send(apiResponse({message: 'File uploaded successfully.', image}));
});

router.delete('/delete/:imagename',function (req, res) {
    message : "Error! in image upload.";
    if (!req.params.imagename) {
        console.log("No file received");
        message = "Error! in image delete.";
        return res.status(500).json('error in delete');
    
    } else {
        console.log('file received');
        console.log(req.params.imagename);
        try {
            fs.unlinkSync(DIR+'/'+req.params.imagename+'.png');
            return res.status(200).send('Successfully! Image has been Deleted');
        } catch (err) {
            // handle the error
            return res.status(400).send(err);
        }
        
    }

});

router.get(":prodId/:name", (req, res) => {
    res.sendFile(path.join(__dirname, `./${DIR}/${req.params.prodId}/${req.params.name}`));
});


router.post("/newfolder", (req, res) => {
    try {

        if(req.body._id == null || req.body._id == undefined){
            throw new Error('Need to provide an id on browser')
        }
        
        const newDir = `./uploads/${req.body._id}`;

        fs.access(newDir, (error) => {
        
            // To check if the given directory 
            // already exists or not
            if (error) {
            // If current directory does not exist
            // then create it
                fs.mkdir(newDir, (error) => {
                    if (error) {
                        throw new Error('Something wrong happened');
                    } else {
                        res.status(201).send(`Directory ${req.body._id} created successfully`)
                    }
                });
            } else {
                throw new Error(`Directory ${req.body._id} already exist`)
            }
        });
        
    } catch (e){
        res.send({message: e.message, type: 'error'})
    }
})

module.exports = router;