const movieService = require('../services/movieService');

// End point pour les films
exports.showMovies = (req, res) => {
  movieService.showMovies(req, res);
};

exports.addMovie = (req, res) => {
  movieService.addMovie(req, res);
};
