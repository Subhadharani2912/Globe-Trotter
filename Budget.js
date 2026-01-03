const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trip = require('./Trip');

const Budget = sequelize.define('Budget', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
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

Budget.belongsTo(Trip, { foreignKey: 'tripId' });
Trip.hasMany(Budget, { foreignKey: 'tripId' });

module.exports = Budget;
