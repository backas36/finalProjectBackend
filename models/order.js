'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      Order.belongsTo(models.Discount, {
        foreignKey: 'discountId',
        onDelete: 'CASCADE'
      })
    }
  };
  Order.init({
    accepted_at: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    is_accepted: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    sum: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};