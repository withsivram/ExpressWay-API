const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

//parse requests of content-type - application/xx-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}))

// parse requests of content-type - aapplication/json
app.use(bodyParser.json())

// configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser : true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/',(req,res) => {
    res.json({"message": "Welcome to MovieRating application"});
});

// Require movie routes
require('./app/routes/movie.routes.js')(app);

// listen to requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

