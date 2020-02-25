const mongoose = require("mongoose");

//Schema Setup
const imageSchema = new mongoose.Schema({

    imageId: String,
    content: String,
    created: {type: Date, default: Date.now}
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;