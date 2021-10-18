'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Transactions', [
      {
        id: '6ec9a5a9-ba35-468f-a8e4-ce5fa1fdcda9',
        orderId: '66411327-35f0-4362-9402-5dda34a67357',
        productId: '95680cbe-8b11-43fa-9af7-cb1493fd1485',
        quantity: 2,
        note:"-",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f900edfd-33c8-4d67-b806-ddfc03cb8da3',
        orderId: '66411327-35f0-4362-9402-5dda34a67357',
        productId: '82193a3f-f2b2-4ed6-8e83-9f493d3b6a94',
        quantity: 1,
        note:"附上蠟燭",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:'de69828f-9fc2-4d04-bfc0-8638ce5b913a',
        orderId: 'e0ff55cd-bd80-412c-8337-edfa9187f5df',
        productId: '95680cbe-8b11-43fa-9af7-cb1493fd1485',
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