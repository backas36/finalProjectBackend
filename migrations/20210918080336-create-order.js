'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      accepted_at: {
        type: Sequelize.DATE,
        allowNull:true
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull:true
      },
      is_accepted: {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      sum: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};