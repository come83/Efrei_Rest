const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController'); // Assurez-vous d'importer le contrôleur de films correct

// Routes pour les films
router.get('/showmovies', movieController.showMovies);
router.get('/getAddressCinema', movieController.getAddressCinema);
router.post('/addMovie', movieController.addMovie);

module.exports = router;
