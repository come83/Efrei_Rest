const userService = require('../services/userService');

exports.displayLogin = async (req, res) => {
  try {
      const users = await userService.displayLogin();
      res.status(200).json(users);
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
  }
};

exports.login = async (req, res) => {
  try {
    const username = req.query.username;
    const password = req.query.password;
    const authentification = await userService.login(username, password);
    res.status(200).json(authentification)
  } catch (error){
    res.status(400).json({ message: error.message });
  }
};
