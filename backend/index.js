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
  password: '',//process.env.PASSWORD,
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

  const sql = 'Select * from user';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/login', (req, res) => {

  const sql = 'SELECT username FROM user WHERE username="'+req.query.username+'" and password="'+req.query.password+'";';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    } else {

      if (results.length === 0){
        res.status(401).json(results)
        // 401 Unauthorized is the status code to return when the client provides no credentials or invalid credentials.
      }
      else if (results.length === 1){
        // Le code de statut de réponse HTTP 200 OK indique la réussite d'une requête.
        res.status(200).json(results);
      }
    }
  });
});

app.post('/addMovie', (req, res) => {
  const film = req.body;

  // Vérifier si le réalisateur existe, sinon l'ajouter
  db.query('SELECT id FROM directors WHERE director_name = ?', [film.director], (err, results) => {
      if (err) {
          console.error('Erreur lors de la vérification du réalisateur:', err);
          return res.status(500).json({ error: 'Une erreur est survenue lors de la vérification du réalisateur' });
      }

      let directorID;
      if (results.length > 0) {
          directorID = results[0].id;
      } else {
          db.query('INSERT INTO directors (director_name) VALUES (?)', [film.director], (err, results) => {
              if (err) {
                  console.error('Erreur lors de l’ajout du réalisateur:', err);
                  return res.status(500).json({ error: 'Une erreur est survenue lors de l’ajout du réalisateur' });
              }
              directorID = results.insertId;
          });
      }

      // Vérifier si la langue existe, sinon l'ajouter
      db.query('SELECT id FROM languages WHERE language_name = ?', [film.language], (err, results) => {
          if (err) {
              console.error('Erreur lors de la vérification de la langue:', err);
              return res.status(500).json({ error: 'Une erreur est survenue lors de la vérification de la langue' });
          }

          let languageID;
          if (results.length > 0) {
              languageID = results[0].id;
          } else {
              db.query('INSERT INTO languages (language_name) VALUES (?)', [film.language], (err, results) => {
                  if (err) {
                      console.error('Erreur lors de l’ajout de la langue:', err);
                      return res.status(500).json({ error: 'Une erreur est survenue lors de l’ajout de la langue' });
                  }
                  languageID = results.insertId;
              });
          }

          const sqlInsertMovie = `INSERT INTO movies (title, duration, director_id, language_id, min_age, id_owner) VALUES (?, ?, ?, ?, ?, ?)`;
          const values = [film.title, film.duration, directorID, languageID, film.minAge, 1];

          db.query(sqlInsertMovie, values, (err, results) => {
              if (err) {
                  console.error('Erreur lors de l’insertion du film:', err);
                  return res.status(500).json({ error: 'Une erreur est survenue lors de l’insertion du film' });
              } else {
                  // Insérez également les acteurs, le calendrier, etc. si nécessaire
                  res.status(200).json({ success: true, message: "Film ajouté avec succès" });
              }
          });
      });
  });
});


app.get('/showmovies', (req, res) => {
  // Exemple: obtenez tous les films et leurs informations de projection
  const sqlQuery = `
    SELECT m.title, m.duration, d.director_name, l.language_name, s.adresse_cinema
    FROM movies m 
    JOIN directors d ON m.director_id = d.id
    JOIN languages l ON m.language_id = l.id
    JOIN movie_schedule s ON m.id = s.movie_id
  `;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des films:", err);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des films' });
    } else {
      res.json(results);
    }
  });
});


// Démarrage du serveur Express
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
