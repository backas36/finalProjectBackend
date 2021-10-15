'use strict';
const DataTypes = require('sequelize').DataTypes;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";')
    await queryInterface.createTable('Products', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      img_url: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      market_price: {
        type: Sequelize.INTEGER
      },
      limited: {
        type: Sequelize.INTEGER
      },
      is_deleted: {
        type: Sequelize.BOOLEAN
      },
      is_completed: Sequelize.BOOLEAN,
      buyerName: Sequelize.STRING,
      buyerPhone: Sequelize.STRING,
      buyerAddress: Sequelize.TEXT,
      deliverDate: Sequelize.DATE,
      receiverName: Sequelize.STRING,
      receiverPhone: Sequelize.STRING,
      receiverAddress: Sequelize.TEXT,
      lastFiveNumber: Sequelize.STRING,
      donateInvoice: Sequelize.BOOLEAN,
      invoiceType: Sequelize.STRING,
      invoiceNumber: Sequelize.STRING,
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
    await queryInterface.dropTable('Products');
  }
};