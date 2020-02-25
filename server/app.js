const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Image = require("./image");
const multer = require("multer");
const cloudinary = require("cloudinary");
require("dotenv").config();
const app = express();

const storage = multer.diskStorage({

    filename: function(req, file, callback) {
        
        callback(null, Date.now() + file.originalname);
    }
});

const imageFilter = function(req, file, cb){

    // Accept image file only
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){

        return cb(new Error("Only image file are allowed!"), false);
    }

    cb(null, true);
}

const upload = multer({storage: storage, fileFilter: imageFilter});

cloudinary.config({
    cloud_name: "daied1lpk",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//Connect mongoDB
mongoose.connect("mongodb://localhost:27017/image", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Create image
app.post("/image", upload.single("image"), function(req, res){

    cloudinary.v2.uploader.upload(req.file.path, function(err, result){

        if(err){

            console.log(err);
        }
        else{

            let image = {
                imageId: result.public_id,
                content: result.secure_url
            };
    
            Image.create(image, function(err, createdImage){
    
                if(err){
    
                    console.log(err);
                }
                else{

                    res.sendStatus(201);
                }
            });
        }
    }); 
});

// Get all images
app.get("/image", function(req, res){
    
    getAllImage(req, res);
});

// Update image
app.put("/image/:id", upload.single("image"), function(req, res){
    
    Image.findById(req.params.id, async function(err, foundImage){

        if(err){

            console.log(err);
        }
        else{

            if(req.file){
                
                try{

                    await cloudinary.v2.uploader.destroy(foundImage.imageId); 
                    let result = await cloudinary.v2.uploader.upload(req.file.path);
                    foundImage.imageId = result.public_id;
                    foundImage.content = result.secure_url;
                }
                catch(err){

                    return console.log(err);
                }
            }

            foundImage.save();
            res.sendStatus(201);
        }
    });
});

// Delete image
app.delete("/image/:id", upload.single("image"), function(req, res){
    
    Image.findById(req.params.id, async function(err, foundImage){

        if(err){

            console.log(err);
        }
        else{

            try{
                await cloudinary.v2.uploader.destroy(foundImage.imageId); 
                await foundImage.remove();
                getAllImage(req, res);
            }
            catch(err){

                return console.log(err);
            }
        }  
    });
});

function getAllImage(req, res){

    Image.find({}, function(err, images){
                
        if(err){

            console.log(err);
        }
        else{
            
            res.send(images);
        }
    });
}

app.listen(5000, function(){
    console.log("server has runnig");  
});