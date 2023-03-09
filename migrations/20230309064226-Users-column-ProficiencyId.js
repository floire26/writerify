'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      `Users`,
      `ProficiencyId`,
      {
        type: DataTypes.INTEGER,
        references: {
          model: `Proficiencies`,
          key: `id`
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
      `Users`,
      `ProficiencyId`,
      {}
    )
  }
};
