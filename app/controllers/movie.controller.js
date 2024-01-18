const Movie = require('../models/movie.model.js');

// Create and Save a new listing
exports.create = (req, res) => {
    // Validate request
    if (!req.body.movieName){
        return res.status(400).send({
            message: "Listing content can not be empty"
        });
    }

    // Create a Listing
    const movie = new Movie({
        movieName: req.body.movieName || "Untitled Listing",
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        summary:req.body.summary
    });

    //Save Listing in the database
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the listing."
        });
    });
};

// Retrieve and return all listing from the database.
exports.findAll = (req, res) => {
    Movie.find()
    .then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving."
        });
    });
};

// Find a single listing with a movieId
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId)
    .then(movie => {
        if(!movie){
            return res.status(404).send({
                message: "Listing not found with id" + req.params.movieId
            });
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Listing not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error retrieving listing with id " + req.params.movieId
        });
    });
};


// Update a listing identified by the listingId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.movieName) {
        return res.status(400).send({
            message: "Listing content can not be empty"
        });
    }

    // Find movie and update it with the request body
    Movie.findByIdAndUpdate(req.params.movieId, {
        movieName: req.body.movieName || "Untitled Listing",
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        summary:req.body.summary
    }, {new: true})
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.movieId
            });
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error updating listing with id " + req.params.movieId
        });
    });
};

// Delete a listing with the specified listingId in the request
exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.movieId
            });
        }
        res.send({message: "Listing deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Listing not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Could not delete listing with id " + req.params.movieId
        });
    });
};