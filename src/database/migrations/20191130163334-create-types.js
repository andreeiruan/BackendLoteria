'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('types_game', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        quantity_numbers: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        minimum_value: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        maximum_value: {
          type: Sequelize.INTEGER,
          allowNull: false          
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updated_at: {
            type: Sequelize.DATE,
            allowNull: false
          }

      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('types_game');
  }
};
