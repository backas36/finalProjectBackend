'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      {
        orderId: 1,
        productId: 1,
        quantity: 2,
        note:"-",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 1,
        note:"附上蠟燭",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 5,
        note:"-",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {})
  }
};