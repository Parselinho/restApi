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
        notEmpty: {
          msg: 'First name is required'
        },
        notNull: {
          msg: 'Please provide a first name'
        }
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First name is required'
        },
        notNull: {
          msg: 'Please provide a last name'
        }
      },
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        notNull: {
          msg: 'Please provide a value for "emailAddress"'
        },
        notEmpty: {
          msg: 'Please provide a value for "emailAddress"'
        },
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "password"'
        },
        notEmpty: {
          msg: 'Please provide a value for "password"'
        }
      }
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
