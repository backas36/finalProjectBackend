'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cart_items', [
      {
        id: 1,
        UserId: "9a4b3740-e8b2-4a07-88f1-d4c8ff1f964a",
        ProductId: "95680cbe-8b11-43fa-9af7-cb1493fd1485",
        is_empty: null,
        product_quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        UserId: "9a4b3740-e8b2-4a07-88f1-d4c8ff1f964a",
        ProductId: "9609260d-740a-4398-9664-58cc7cc54eb9",
        is_empty: null,
        product_quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        UserId: "daa708ba-0bc4-4fbd-91ee-bb95b7f2579e",
        ProductId: "95680cbe-8b11-43fa-9af7-cb1493fd1485",
        is_empty: null,
        product_quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cart_items', null, {})
  }
}
