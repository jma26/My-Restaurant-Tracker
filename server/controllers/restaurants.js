const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const fs = require('fs');

module.exports = {
    add_review: function(request, response) {
        console.log('Controllers @restaurant.js route pinging', request.body);
        if (request.body.image === null) {
            let restaurant = new Restaurant({
                restaurant_name: request.body.restaurant_name,
                lng: request.body.lng,
                lat: request.body.lat,
                review_content: [{
                    reviewer: request.body.reviewer,
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
        } else {
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
    },
    getReviews: function(request, response) {
        console.log('Controllers @restaurant.js route pinging - getReviews');
        Restaurant.find({}).limit(5).exec(function(error, result) {
            if (error) {
                console.log('Something went wrong retrieving reviews');
                response.json(error);
            } else {
                console.log('Successful retrieval');
                response.json(result);
            }
        })
    },
    addComment: function(request, response) {
        console.log('Controllers @restaurant.js route pinging - addComment');
        console.log(request.body.comment);
        console.log(request.body.restaurant);
        let comment = {
            "comment": request.body.comment.comment,
            "name": request.body.user
        }
        Restaurant.findOneAndUpdate({"_id": request.body.restaurant}, {$push: {comments: comment}}, {new: true}, function(error, result) {
            if (error) {
                response.json(error);
                console.log(error);
            } else {
                response.json(result);
            }
        })
    }
}