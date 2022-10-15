const express = require("express");
const router = express.Router();
const env = require('../env.js')
const multer = require('multer');
const path = require("path");
const fs = require("fs");

var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const directory = `uploads/${req.params.prodId}`;

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true })
            }
            cb(null, directory);
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname.toLocaleLowerCase().replaceAll(" ", ""));
        }
    })
});

// TODO: è un form-data! Devi provare a vedere come funge
router.post('/upload/:prodId', upload.single('image'),(req, res) => {
    const image = req.image;

    res.status(201)
    res.send({message: 'File uploaded successfully', type: 'info'})
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