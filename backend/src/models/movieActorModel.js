const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Assurez-vous d'importer la connexion à la base de données correcte

const MovieActor = sequelize.define('MovieActor', {
  actor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = MovieActor;
