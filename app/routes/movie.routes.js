module.exports = (app) => {
    const movies = require('../controllers/movie.controller.js');

    // Create a new listing
    app.post('/movies', movies.create);

    // Retrieve all listing
    app.get('/movies', movies.findAll);

    // Retrieve a single listing with listingID
    app.get('/movies/:movieId', movies.findOne);

    // Update a listing with listingId
    app.put('/movies/:movieId', movies.update);

    // Delete a Listing with lisitngId
    app.delete('/movies/:movieId', movies.delete);
}

