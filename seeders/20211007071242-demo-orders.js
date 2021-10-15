'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        id:'66411327-35f0-4362-9402-5dda34a67357',
        userId: '9a4b3740-e8b2-4a07-88f1-d4c8ff1f964a',
        accepted_at: new Date(),
        completed_at:new Date(),
        is_accepted:true,
        price:	600,
        sum:	650,
        discountId:'1f3554e6-a851-480d-a450-6933c903ad62',
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerName: 'ww',
        buyerPhone: '000000',
        buyerAddress: 'rerersjs',
        deliverDate: new Date(),
        receiverName: 'eeee',
        receiverPhone: '039272',
        receiverAddress: 'ududc',
        lastFiveNumber: '02211',
        donateInvoice: false,
        invoiceType: 'ttt',
        invoiceNumber: '33445'
      },
      {
        id:'e0ff55cd-bd80-412c-8337-edfa9187f5df',
        userId: 'daa708ba-0bc4-4fbd-91ee-bb95b7f2579e',
        accepted_at: new Date(),
        completed_at:new Date(),
        is_accepted:false,
        price:	1000,
        sum:	1000,
        discountId:'1f3554e6-a851-480d-a450-6933c903ad62',
        createdAt: new Date(),
        updatedAt: new Date(),
        buyerName: 'ww',
        buyerPhone: '000000',
        buyerAddress: 'rerersjs',
        deliverDate: new Date(),
        receiverName: 'eeee',
        receiverPhone: '039272',
        receiverAddress: 'ududc',
        lastFiveNumber: '02211',
        donateInvoice: false,
        invoiceType: 'ttt',
        invoiceNumber: '33445'
      },

    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {})
  }
};