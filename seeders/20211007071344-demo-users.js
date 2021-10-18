'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: '9a4b3740-e8b2-4a07-88f1-d4c8ff1f964a',
        username: "12312312",
        password: bcrypt.hashSync('abc', salt),
        firstname: '幻',
        lastname: '幻',
        phone: '0900000000',
        email: 'k22225555@gmail.com',
        address: '台北市無名區無名路3號',
        authority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'daa708ba-0bc4-4fbd-91ee-bb95b7f2579e',
        username: "12315555555",
        password: bcrypt.hashSync('123', salt),
        firstname: '維',
        lastname: '尼',
        phone: '0900000088',
        email: 'h22dd5555@gmail.com',
        address: '台北市無名區無名路5號',
        authority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2ba3296f-2b30-40e4-b0ec-f49551be9246',
        username: "123123xx2",
        password: bcrypt.hashSync('456', salt),
        firstname: '洋',
        lastname: '洋',
        phone: '0900001564',
        email: 'base2225555@gmail.com',
        address: '台北市無名區無名路6號',
        authority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '43a73f78-bf16-4975-8daa-4756af02cbe5',
        username: "1231216482",
        password: bcrypt.hashSync('789', salt),
        firstname: '怡',
        lastname: '萱',
        phone: '0900002654',
        email: 's22225555@gmail.com',
        address: '台北市無名區無名路7號',
        authority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};