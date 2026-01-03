const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trip = require('./Trip');

const Activity = sequelize.define('Activity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
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

Activity.belongsTo(Trip, { foreignKey: 'tripId' });
Trip.hasMany(Activity, { foreignKey: 'tripId' });

module.exports = Activity;
