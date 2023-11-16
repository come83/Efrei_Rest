const dataAccessLayer = require('../../database.js');

// Fonction pour afficher les films en fonction d'une adresse
const showMovies = (address) => {
    const sql = `
    SELECT 
    m.title, 
    m.duration, 
    d.director_name, 
    l.language_name, 
    DATE_FORMAT(s.startDate, '%d-%m-%Y') as startDate,
    DATE_FORMAT(s.endDate, '%d-%m-%Y') as endDate,
    s.daysMWF, 
    s.daysTTS, 
    s.daysTFS, 
    s.startTime,
    s.adresse_cinema,
    GROUP_CONCAT(a.actor SEPARATOR ', ') AS actors
    FROM movies m
    JOIN directors d ON m.director_id = d.id
    JOIN languages l ON m.language_id = l.id
    JOIN movie_schedule s ON m.id = s.movie_id
    LEFT JOIN movie_actors a ON m.id = a.movie_id
    WHERE s.adresse_cinema = ?
    GROUP BY m.id, s.id;
    `;

    return new Promise((resolve, reject) => {
        dataAccessLayer.executeSelectQuery(sql, [address], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des films :', err);
                reject(new Error('Une erreur est survenue lors de la récupération des films'));
            } else {
              console.log(results)
                resolve(results);
            }
        });
    });
};

// Fonction pour obtenir les adresses des cinémas
const getAddressCinema = () => {
    const sql = 'SELECT DISTINCT adresse_cinema FROM movie_schedule';

    return new Promise((resolve, reject) => {
        dataAccessLayer.executeSelectQuery(sql, [], (err, results) => {
            if (err) {
                console.error('Erreur lors de la récupération des adresses :', err);
                reject(new Error('Une erreur est survenue lors de la récupération des adresses'));
            } else {
                resolve(results);
            }
        });
    });
};

const addMovie = (req, res) => {
  // Logique pour ajouter un film
  const film = req.body;

  const sql1 = "SELECT id FROM directors WHERE director_name = ?"

  dataAccessLayer.executeSelectQuery(sql1, [film.director], (err, results) => { 
    if (err) {
      console.error('Erreur lors de la vérification du réalisateur:', err);
      return res.status(500).json({ error: 'Une erreur est survenue lors de la vérification du réalisateur' });
    }
    else {
      let directorID;

      if (results.length > 0) {
          directorID = results[0].id;
      } else {
          const sql2 = "INSERT INTO directors (director_name) VALUES (?)"

          dataAccessLayer.executeNonSelectQuery(sql2, [film.director], (err, results) => {
              if (err) {
                  console.error('Erreur lors de l’ajout du réalisateur:', err);
                  return res.status(500).json({ error: 'Une erreur est survenue lors de l’ajout du réalisateur' });
              }
              directorID = results.insertId;
          });
      }

      // Vérifier si la langue existe, sinon l'ajouter
      const sql3 = 'SELECT id FROM languages WHERE language_name = ?'

      dataAccessLayer.executeSelectQuery(sql3, [film.language], (err, results) => {
          if (err) {
              console.error('Erreur lors de la vérification de la langue:', err);
              return res.status(500).json({ error: 'Une erreur est survenue lors de la vérification de la langue' });
          }

          let languageID;
          if (results.length > 0) {
              languageID = results[0].id;
          } else {
              const sql4 = 'INSERT INTO languages (language_name) VALUES (?)'

              dataAccessLayer.executeNonSelectQuery(sql4, [film.language], (err, results) => {
                  if (err) {
                      console.error('Erreur lors de l’ajout de la langue:', err);
                      return res.status(500).json({ error: 'Une erreur est survenue lors de l’ajout de la langue' });
                  }
                  languageID = results.insertId;
                  console.log(languageID)
                  console.log(results)
              });
          }

          const sqlInsertMovie = `INSERT INTO movies (title, duration, director_id, language_id, min_age, id_owner) VALUES (?, ?, ?, ?, ?, ?)`;
          const values = [film.title, film.duration, directorID, languageID, film.minAge, film.id_owner];

          dataAccessLayer.executeNonSelectQuery(sqlInsertMovie, values, (err, results) => {
              if (err) {
                  console.error('Erreur lors de l’insertion du film:', err);
                  return res.status(500).json({ error: 'Une erreur est survenue lors de l’insertion du film' });
              } else {
                const movieID = results.insertId;  // Récupération de l'ID du film inséré
          
                // Insérer également les acteurs en utilisant l'ID du film
                if (film.actors) {
                  const actorsSql = 'INSERT INTO movie_actors (movie_id, actor) VALUES ?';
                  const actorsValues = [[movieID, film.actors]];
              
                  dataAccessLayer.executeNonSelectQuery(actorsSql, [actorsValues], (actorsErr) => {
                    if (actorsErr) {
                      console.error('Erreur lors de l’insertion des acteurs du film:', actorsErr);
                      return res.status(500).json({ error: 'Une erreur est survenue lors de l’insertion des acteurs du film' });
                    }
                  });
                }
    
                const scheduleSql = `INSERT INTO movie_schedule (movie_id, startDate, endDate, daysMWF, daysTTS, daysTFS, startTime, adresse_cinema)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
                const daysMWF = film.daysOfWeek.includes('MWF') ? 1 : 0;
                const daysTTS = film.daysOfWeek.includes('TTS') ? 1 : 0;
                const daysTFS = film.daysOfWeek.includes('TFS') ? 1 : 0;
    
                const scheduleValues = [movieID, film.startDate, film.endDate, daysMWF, daysTTS, daysTFS, film.startTime, film.city];
    
                dataAccessLayer.executeNonSelectQuery(scheduleSql, scheduleValues, (scheduleErr) => {
                  if (scheduleErr) {
                    console.error('Erreur lors de l’insertion des données de l horaire du film:', scheduleErr);
                    return res.status(500).json({ error: 'Une erreur est survenue lors de l’insertion des données de l horaire du film' });
                  }
                  else{
                    return res.status(200).json({ success: true, message: "Film ajouté avec succès" });
                  }
                });
                      
              }
          });
      });
    }
  });
};

module.exports = {
  showMovies,
  getAddressCinema,
  addMovie
  // autres méthodes exportées
};