'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        userId: 3,
        accepted_at: new Date(),
        completed_at:new Date(),
        is_accepted:true,
        price:	600,
        sum:	650,
        discountId:1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        accepted_at: new Date(),
        completed_at:new Date(),
        is_accepted:false,
        price:	1000,
        sum:	1000,
        discountId:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  }
};