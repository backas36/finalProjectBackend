
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        id: '95680cbe-8b11-43fa-9af7-cb1493fd1485',
        name: "阿嬤的蘋果派",
        category: "餅乾",
        desc	: '阿嬤的蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派蘋果派',
        img_url: 'https://upload.cc/i1/2021/10/07/HGPxcs.jpg',
        price: 160,
        market_price:'160',
        limited: 15,
        is_deleted: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9609260d-740a-4398-9664-58cc7cc54eb9',
        name: "我的梅果花園",
        category: "蛋糕",
        desc	: '我的梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園梅果花園',
        img_url: 'https://upload.cc/i1/2021/10/07/3vrSJx.jpg',
        price: 180,
        market_price:'180',
        limited: 20,
        is_deleted: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '82193a3f-f2b2-4ed6-8e83-9f493d3b6a94',
        name: "青春橘子派",
        category: "巧克力",
        desc	: '青春橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派橘子派',
        img_url: 'https://upload.cc/i1/2021/10/07/gqtB8l.jpg',
        price: 260,
        market_price:'160',
        limited: 30,
        is_deleted: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e9cb0fdf-9038-4153-b80c-321df003c69c',
        name: "藍莓珠寶盒",
        category: "手工飲料",
        desc	: '藍莓藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒藍莓珠寶盒',
        img_url: 'https://upload.cc/i1/2021/10/07/PdnSq5.jpg',
        price: 100,
        market_price:'100',
        limited: 45,
        is_deleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};