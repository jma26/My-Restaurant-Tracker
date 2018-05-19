const mongoose = require('mongoose');

// Restaurant schema
const RestaurantSchema = mongoose.Schema({
    restaurant_name: { type: String, required: [true, 'Restaurant name is required']},
    lng: { type: Number, required: [true, 'Longitude is required']},
    lat: { type: Number, required: [true, 'Latitude is required']},
    review_content: [{
        reviewer: { type: String, required: [true, 'Reviewer\'s name is required']},
        review: { type: String, required: [true, 'Review can not be blank'] },
        stars: { type: Number, required: [true, 'Star rating required'], min: 1, max: 5 },
        images: [{ data: Buffer, contentType: String }]
    }]
});

let Restaurant = mongoose.model('Restaurant', RestaurantSchema);