const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DB
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à MySQL avec succès');
  }
});
// Fonctions pour gérer les opérations de base de données

// Exemple : Fonction pour exécuter une requête SELECT
const executeSelectQuery = (sql, params, callback) => {
    db.query(sql, params, (err, results) => {
        if (err) {
        console.error('Erreur de base de données :', err);
        callback(err, null);
        } else {
        callback(null, results);
        }
    });
};

// Exemple : Fonction pour exécuter une requête INSERT, UPDATE, DELETE
const executeNonSelectQuery = (sql, params, callback) => {
    db.query(sql, params, (err, results) => {
        if (err) {
        console.error('Erreur de base de données :', err);
        callback(err, null);
        } else {
        callback(null, results);
        }
    });
};
  
  // Vous pouvez ajouter d'autres fonctions pour gérer d'autres types de requêtes SQL
  
  module.exports = {
    executeSelectQuery,
    executeNonSelectQuery,
  };
