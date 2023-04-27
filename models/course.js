// models/courses.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Course = sequelize.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  materialsNeeded: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Course;
