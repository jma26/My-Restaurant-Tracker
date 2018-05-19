const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const fs = require('fs');

module.exports = {
    add_review: function(request, response) {
        console.log(request.body);
        let restaurant = new Restaurant({
            restaurant_name: request.body.name,
            lng: request.body.lng,
            lat: request.body.lat,
            review_content: [{
                reviewer: request.body.user,
                review: request.body.review,
                stars: request.body.stars
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