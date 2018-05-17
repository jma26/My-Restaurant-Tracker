const mongoose = require('mongoose');

// Restaurant schema
const RestaurantSchema = mongoose.Schema({
    user: { type: String, required: [true, 'Reviwer\'s name is required']},
    restaurant: { type: String, required: [true, 'Restaurant name is required']},
    lng: { type: Number, required: [true, 'Longitude is required']},
    lat: { type: Number, required: [true, 'Latitude is required']},
    review: [{
        content: { type: String },
        stars: { type: Number }
    }],
    images: [{ data: Buffer, contentType: String }]
});

let Restaurant = mongoose.model('Restaurant', RestaurantSchema);