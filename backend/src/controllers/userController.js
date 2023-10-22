const userService = require('../services/userService');

// End points pour les utilisateurs
exports.displayLogin = (req, res) => {
  userService.displayLogin(req, res);
};

exports.login = (req, res) => {
  userService.login(req, res);
};
