const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize express
const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')));
app.use(bodyParser.json());

// Angular app
app.use(express.static(path.join(__dirname, '/MovieSearch/dist')));

// Require mongoose.js to connect to mongoDB
require('./server/config/mongoose.js');

// Require routes.js for server routing
let route = require('./server/config/routes.js');
route(app);

// Catch all route to Angular routes
app.all("*", (request, response, next) => {
    response.send(path.resolve("./MovieSearch/dist/index.html"))
});

// Port Number
const port = 8000;

// Server Port
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})