'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Order, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE'
      })
      Transaction.hasOne(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE'
      })
    }
  };
  Transaction.init({
    quantity: DataTypes.INTEGER,
    note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};