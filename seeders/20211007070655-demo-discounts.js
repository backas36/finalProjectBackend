'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discounts', [
      {
        desc: "滿千免運",
        price: 60,
        threshold: 1000,
        shipment:200,
        is_deleted:null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc: "滿百免運",
        price: 60,
        threshold: 100,
        shipment:50,
        is_deleted:true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discounts', null, {})
  }
};
