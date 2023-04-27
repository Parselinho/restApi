'use strict';

// models/users.js
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');



const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.associate = models => {
  User.hasMany(models.Course, { foreignKey: 'userId' });
};

module.exports = User;
