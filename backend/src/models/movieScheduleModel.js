const { DataTypes } = require('sequelize');
const sequelize = require('../../database.js'); // Assurez-vous d'importer la connexion à la base de données correcte

const MovieSchedule = sequelize.define('MovieSchedule', {
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  daysMWF: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  daysTTS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  daysTFS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  adresse_cinema: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = MovieSchedule;
