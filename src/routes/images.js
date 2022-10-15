const express = require("express");
const router = express.Router();
const env = require('../env.js')
const multer = require('multer');
const path = require("path");
const fs = require("fs");

router.post('/upload/:prodId', (req, res) => {
    try {

        const directory = path.join(__dirname, `../../${env.dir.upload}/${req.params.prodId}`)

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
        }

        const buffer = Buffer.from(req.body.image, "base64");

        fs.writeFileSync(path.join(directory, Date.now() + '.png' ), buffer);

        res.status(201)
        res.send({message: 'File uploaded successfully', type: 'info'})

    } catch (e) {
        res.status(500)
        res.send({message: e.message, type: 'error'})
    }

});

router.post('/delete', function (req, res) {
    try {
        if (req.body.prodId == null || req.body.prodId == undefined ){
            throw new Error('Must provide a product id')
        }

        if (req.body.imagename == null || req.body.imagename == undefined){
            throw new Error('Must provide image name')
        }

        fs.unlinkSync(path.join(__dirname, `../../${env.dir.upload}/${req.body.prodId}/${req.body.imagename}`))
        return res.status(200).send('Successfully! Image has been Deleted');

    } catch (err){
        res.status(500)
        res.send({message: err.message, type: 'error'})
    }
});

router.post("/info", (req, res) => {
    res.sendFile(path.join(__dirname, `../../${env.dir.upload}/${req.body.prodId}/${req.body.name}`));
});

router.get("/list/:prodId", (req, res) => {
    try {
        const mainPath = path.join(__dirname, `../../${env.dir.upload}/${req.params.prodId}`)
        var images = []
        //passsing directoryPath and callback function
        fs.readdir(mainPath, function (err, files) {
            //handling error
            if (err) {
                throw new Error('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                images.push(file);
            });

            res.status(200);
            res.send(JSON.stringify({images: images, tot: images.length}))
        });
    } catch (e){
        res.status(500)
        res.send({message: e.message, type: 'error'})
    }
})

module.exports = router;