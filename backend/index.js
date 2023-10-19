const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Instantiation de la connexion à la base de donnée
const db = mysql.createConnection({
  host: 'localhost',
  port: '3306',  
  user: 'root',
  password: process.env.PASSWORD,
  database: process.env.DB
});

// Connexion à la base de donnée
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à MySQL avec succès');
  }
});

// End point de test qui recupere les informations de la table login 
app.get('/display-login', (req, res) => {

  const sql = 'Select * from login';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Démarrage du serveur Express
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
