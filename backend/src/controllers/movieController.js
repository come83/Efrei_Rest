const movieService = require('../services/movieService');

exports.showMovies = async (req, res) => {
    try {
        const results = await movieService.showMovies(req.query.address);
        res.status(200).json(results);
    } catch (error) {
        console.error('Erreur :', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getAddressCinema = async (req, res) => {
    try {
        const results = await movieService.getAddressCinema();
        res.status(200).json(results);
    } catch (error) {
        console.error('Erreur :', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.addMovie = (req, res) => {
  movieService.addMovie(req, res);
};
