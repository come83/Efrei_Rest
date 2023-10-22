const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Assurez-vous d'importer la connexion à la base de données correcte

const Language = sequelize.define('language', {
  language_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Language;
