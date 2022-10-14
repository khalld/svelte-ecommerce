const express = require("express");
const router = express.Router();
const Order = require('../db/models/order.js');
const { v4: uuidv4 } = require('uuid');
const env = require('../env.js')
const multer = require('multer');
const path = require("path");
const fs = require("fs");

const DIR = 'uploads';


var storage = multer.diskStorage({
    // TODO: PIPPO must be dynamic!!
    destination: function (req, file, cb) {
        console.log(req)
        cb(null, 'uploads/pippo');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname.replaceAll(" ", "")); //+ '-' + file.originalname);
    }

});

var upload = multer({ storage: storage });

// TODO: è un form-data! Devi provare a vedere come funge
router.post('/image-upload', upload.single('image'),(req, res) => {
    const image = req.image;

    res.status(201)
    res.send({message: 'File uploaded successfully', type: 'info'})

    // res.send(apiResponse({message: 'File uploaded successfully.', image}));
});

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

router.post('/delete', function (req, res) {
    try {
        if (req.body.prodId == null || req.body.prodId == undefined ){
            throw new Error('Must provide a product id')
        }

        if (req.body.imagename == null || req.body.imagename == undefined){
            throw new Error('Must provide image name')
        }

        fs.unlinkSync(path.join(__dirname, `../../${DIR}/${req.body.prodId}/${req.body.imagename}`))
        return res.status(200).send('Successfully! Image has been Deleted');

    } catch (err){
        res.status(500)
        res.send({message: err.message, type: 'error'})
    }


    // if (!req.params.imagename) {
    //     console.log("No file received");
    //     return res.status(500).json('error in delete');    
    // } else {
    //     console.log('file received');
    //     console.log(req.params.imagename);
    //     try {
    //         fs.unlinkSync(DIR+'/'+req.params.imagename+'.png');
    //         return res.status(200).send('Successfully! Image has been Deleted');
    //     } catch (err) {
    //         // handle the error
    //         return res.status(400).send(err);
    //     }
        
    // }

});

router.post("/info", (req, res) => {
    res.sendFile(path.join(__dirname, `../../${DIR}/${req.body.prodId}/${req.body.name}`));
});

module.exports = router;