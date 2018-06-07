const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const fs = require('fs');

module.exports = {
    add_review: function(request, response) {
        console.log('Controllers @restaurant.js route pinging', request.body);
        let buffer = new Buffer(request.body.image.value, 'base64');
        let restaurant = new Restaurant({
            restaurant_name: request.body.restaurant_name,
            lng: request.body.lng,
            lat: request.body.lat,
            review_content: [{
                reviewer: request.body.reviewer,
                review: request.body.review,
                stars: request.body.stars,
                images: [{
                    data: buffer,
                    contentType: request.body.image.filetype,
                    filename: request.body.image.filename
                }]
            }]
        })

        restaurant.save(function(error, result) {
            if (error) {
                console.log('Something went wrong adding a review');
                response.json(error);
            } else {
                console.log('Successful new review');
                response.json(result);
            }
        })
    }
}