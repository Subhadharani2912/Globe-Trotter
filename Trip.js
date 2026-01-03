const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const City = require('./City');

const Trip = sequelize.define('Trip', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

// Each trip belongs to a user
Trip.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Trip, { foreignKey: 'userId' });

Trip.belongsTo(City, { foreignKey: 'cityId' });
City.hasMany(Trip, { foreignKey: 'cityId' });
module.exports = Trip;
