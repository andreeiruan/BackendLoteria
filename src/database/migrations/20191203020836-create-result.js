'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('results', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true, 
          autoIncrement: true,
          allowNull: false
        },
        id_contest: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'contests',
            key: 'id'
          }
        },
        result: {
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
      return queryInterface.dropTable('results');
  }
};
