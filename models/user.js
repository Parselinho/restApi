'use strict';

// Import DataTypes from sequelize
const { DataTypes } = require('sequelize');

// Export a function that takes the sequelize instance as an argument
module.exports = (sequelize) => {
  // Define the User model using sequelize.define
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

  // Define the association between User and Course models
  User.associate = models => {
    // A User has many Courses, with the foreign key 'userId'
    User.hasMany(models.Course, { foreignKey: 'userId' });
  };

  // Return the User model
  return User;
};
