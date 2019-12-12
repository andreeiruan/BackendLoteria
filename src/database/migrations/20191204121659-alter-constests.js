'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'contests', 
        'checked',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
        })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'contests',
      'checked'
    )
  }
};
