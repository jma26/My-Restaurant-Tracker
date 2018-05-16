const mongoose = require('mongoose');

// Restaurant schema
const RestaurantSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Restaurant name is required']},
    lng: { type: Number, required: [true, 'Longitude is required']},
    lat: { type: Number, required: [true, 'Latitude is required']},
    review: [{
        content: { type: String },
        stars: { type: Number }
    }],
    images: [{ data: Buffer, contentType: String }]
});

let Restaurant = mongoose.model('Restaurant', RestaurantSchema);