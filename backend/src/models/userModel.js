const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Assurez-vous d'importer la connexion à la base de données correcte

const User = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
