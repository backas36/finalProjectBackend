'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Orders', // name of Source model
      'userId', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Orders', // name of Target model
          'discountId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Discounts', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Transactions', // name of Target model
          'orderId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Orders', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      })
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Transactions', // name of Target model
          'productId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Products', // name of Source model
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'userId' // key we want to remove
    )
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'Orders', // name of the Target model
          'discountId' // key we want to remove
        );
      })
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'Transactions', // name of the Target model
          'orderId' // key we want to remove
        );
      })
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'Transactions', // name of the Target model
          'productId' // key we want to remove
        );
      });
  }
};
