const mongoose = require('mongoose');

// Restaurant schema
const RestaurantSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    restaurant_name: { type: String, required: [true, 'Restaurant name is required']},
    lng: { type: Number, required: [true, 'Longitude is required']},
    lat: { type: Number, required: [true, 'Latitude is required']},
    review_content: [{
        reviewer: { type: String, required: [true, 'Reviewer\'s name is required']},
        review: { type: String, required: [true, 'Review can not be blank'] },
        stars: { type: Number, required: [true, 'Star rating required'], min: 1, max: 5 },
        created: { type: Date, default: Date.now },
        images: [{ data: Buffer, contentType: String, filename: String }]
    }],
    comments: [{
        comment: { type: String },
        name: {type: String }
    }]
});

let Restaurant = mongoose.model('Restaurant', RestaurantSchema);