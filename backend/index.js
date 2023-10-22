const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8081; // Port d'écoute du serveur

// Middleware pour gérer les données JSON
app.use(bodyParser.json());

// Middleware pour autoriser les requêtes depuis tous les domaines (CORS)
app.use(cors());

// Importer et utiliser vos routes
const userRoutes = require('./src/routes/userRoutes'); // Exemple de fichier de routes
const movieRoutes = require('./src/routes/movieRoutes'); // Exemple de fichier de routes

app.use('/users', userRoutes); // Utilisez les routes pour les utilisateurs
app.use('/movies', movieRoutes); // Utilisez les routes pour les films

// Gestion des erreurs pour les routes non trouvées
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
