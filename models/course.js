'use strict';

// Import Sequelize library
const Sequelize = require('sequelize');

// Export a function that takes the sequelize instance as an argument
module.exports = sequelize => {
  // Define the Course model by extending the Sequelize.Model class
  class Course extends Sequelize.Model {}

  // Initialize the Course model with its attributes and their data types
  Course.init(
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true
      },
      materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    { sequelize }
  );

  // Define the association between the Course and User models
  Course.associate = models => {
    // A Course belongs to a User, with the foreign key 'userId'
    Course.belongsTo(models.User, { foreignKey: 'userId' });
  };

  // Return the Course model
  return Course;
};
