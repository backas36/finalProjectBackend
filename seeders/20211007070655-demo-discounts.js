'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discounts', [
      {
        id: '1f3554e6-a851-480d-a450-6933c903ad62',
        desc: "滿千免運",
        price: 60,
        threshold: 1000,
        shipment:200,
        is_deleted:null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b5f9d569-a19e-458f-90d7-a3ea121ed596',
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
