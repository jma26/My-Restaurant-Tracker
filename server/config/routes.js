const Restaurants = require('../controllers/restaurants.js');
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');

module.exports = function(app) {
    // Create new restaurant review
    app.post('/newreview', function(request, response) {
        console.log('Creating new restaurant review, @routes.js pinging', request.body);
        Restaurants.add_review(request, response);
    })
    // Retrieve restaurant reviews
    app.get('/getreviews', function(request, response) {
        console.log('Retrieving restaurant reviews, @routes.js pinging');
        Restaurants.getReviews(request, response);
    })
}