const Users = require('../controllers/users.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(app) {
    // Create a new user
    app.post('/registration', function(request, response) {
        console.log('Creating new user, @routes.js pinging');
        Users.create(request, response);
    })
    // Send login information and validate
    app.post('/login', function(request, response) {
        console.log('Retrieving user for validation, @routes.js pinging');
        Users.login(request, response);
    })
    // Retrieve user profile
    app.get('/user/:alias', function(request, response) {
        console.log('Retrieving user profile, @routes.js pinging');
        Users.getUser(request, response);
    })
}