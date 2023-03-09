'use strict';
const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      `Courses`,
      `ClassId`,
      {
        type: DataTypes.INTEGER,
        references: {
          model: 'Classes',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      `Courses`,
      `ClassId`,
      {}
    )
  }
};
