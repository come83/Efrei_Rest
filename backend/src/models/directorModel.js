const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Assurez-vous d'importer la connexion à la base de données correcte

const Director = sequelize.define('director', {
  director_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Director;
