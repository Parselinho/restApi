'use strict';

const Sequelize = require('sequelize');

module.exports = sequelize => {
  class Course extends Sequelize.Model {}

  Course.init(
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A title is required"
          },
          notNull: {
            msg: "Please provide a title"
          }
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "A description is required"
          },
          notNull: {
            msg: "Please provide a description"
          }
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

  Course.associate = models => {
    Course.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Course;
};
