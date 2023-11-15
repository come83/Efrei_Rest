const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

// Routes pour les utilisateurs
router.get('/display-login', userController.displayLogin);
router.get('/login', userController.login);

module.exports = router;
