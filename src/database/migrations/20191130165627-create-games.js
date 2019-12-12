'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('games', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        id_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'types_game',
            key: 'id'
          }
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        id_contest: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'contests',
            key: 'id'
          }
        },
        nums: {
          type: Sequelize.STRING,
          allowNull: false,
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
      return queryInterface.dropTable('games');
  }
};
