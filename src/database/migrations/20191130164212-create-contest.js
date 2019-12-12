'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('contests', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_type_game: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'types_game',
            key: 'id'
          }
        },
        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        accomplished: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
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
      return queryInterface.dropTable('contests');
  
  }
};
