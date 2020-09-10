'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      info: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN
      },
      deadline: {
        type: Sequelize.DATE
      },
      reqUserId: {
        type: Sequelize.UUID
      },
      desUserId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};