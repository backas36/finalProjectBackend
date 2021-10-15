'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
    await queryInterface.createTable('Orders', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
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
      buyerName: {
        type: Sequelize.STRING,
        allowNull:true
      },
      buyerPhone: {
        type: Sequelize.STRING,
        allowNull:true
      },
      buyerAddress: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      deliverDate: {
        type: Sequelize.DATE,
        allowNull:true
      },
      receiverName: {
        type: Sequelize.STRING,
        allowNull:true
      },
      receiverPhone: {
        type: Sequelize.STRING,
        allowNull:true
      },
      receiverAddress: {
        type: Sequelize.TEXT,
        allowNull:true
      },
      lastFiveNumber: {
        type: Sequelize.STRING,
        allowNull:true
      },
      donateInvoice: {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      invoiceType: {
        type: Sequelize.STRING,
        allowNull:true
      },
      invoiceNumber: {
        type: Sequelize.STRING,
        allowNull:true
      },
      is_accepted: {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      is_completed: {
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