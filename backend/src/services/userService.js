const dataAccessLayer = require('../../database.js');

exports.displayLogin = (req, res) => {
  const sql = 'SELECT * FROM user';
  dataAccessLayer.executeSelectQuery(sql, [], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    } else {
      res.status(200).json(results);
    }
  });
};

exports.login = (req, res) => {
  // Logique de connexion utilisateur
  const username = req.query.username;
  const password = req.query.password;
  const sql = 'SELECT id, username FROM user WHERE username = ? AND password = ?';

  dataAccessLayer.executeSelectQuery(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    } else {
      if (results.length === 0) {
        res.status(401).json(results); // 401 Unauthorized
      } else if (results.length === 1) {
        res.status(200).json(results); // 200 OK
      }
    }
  });
};

// Vous pouvez ajouter d'autres fonctions pour gérer la logique métier liée aux utilisateurs
