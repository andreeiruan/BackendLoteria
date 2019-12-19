'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'results',
      'type_game',
      {
        type: Sequelize.INTEGER,
        allowNUll: false,
        references: {
          model: 'types_game',
          key: 'id'
        }
      } 
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'results',
      'type_game'
      )
  }
};
