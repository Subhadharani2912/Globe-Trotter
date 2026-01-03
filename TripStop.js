const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trip = require('./Trip');

const TripStop = sequelize.define('TripStop', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tripId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Trip,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

TripStop.belongsTo(Trip, { foreignKey: 'tripId' });
Trip.hasMany(TripStop, { foreignKey: 'tripId' });

module.exports = TripStop;
