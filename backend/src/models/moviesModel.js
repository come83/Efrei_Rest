const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Assurez-vous d'importer la connexion à la base de données correcte

const Movie = sequelize.define('movies', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  director_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  min_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Movie;
