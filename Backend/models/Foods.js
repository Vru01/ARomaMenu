const mongoose = require("mongoose");
require("./Restaurant");
require("./User");

const foodSchema = new mongoose.Schema({
    title: {
        type: String,    
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        default: "https://domf5oio6qrcr.cloudfront.net/medialibrary/8371/bigstock-Hamburger-And-French-Fries-263887.jpg",
    },
    ARmodelUrl:{
        type: String,
        default: "",
    },
    foodtags: {
        type: String,
        required: true,
    },
    creategory: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    isVeg:{
        type: Boolean,
        default: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        default: 1,
        min: 0,
        max: 5,
    },
    reviews: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    spiceLevel: { 
        type: String,
        enum: ['Spicy', 'More Spicy', 'Medium'],  
        default: 'Medium',
    },
    portionSize: { 
        type: String,
        enum: ['Half Plate', 'Full Plate'],
        default: 'Full Plate',
    },
    portionPrice: { 
        type: Number,
        default: 0,  
    },
});

module.exports = mongoose.model("Food", foodSchema);
