"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      Order.belongsTo(models.Discount, {
        foreignKey: "discountId",
        onDelete: "CASCADE",
      });
    }
  }
  Order.init(
    {
      accepted_at: DataTypes.DATE,
      completed_at: DataTypes.DATE,
      is_accepted: DataTypes.BOOLEAN,
      is_completed: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
      sum: DataTypes.INTEGER,
      buyerName: DataTypes.STRING,
      buyerPhone: DataTypes.STRING,
      buyerAddress: DataTypes.TEXT,
      deliverDate: DataTypes.DATE,
      receiverName: DataTypes.STRING,
      receiverPhone: DataTypes.STRING,
      receiverAddress: DataTypes.TEXT,
      lastFiveNumber: DataTypes.STRING,
      donateInvoice: DataTypes.BOOLEAN,
      invoiceType: DataTypes.STRING,
      invoiceNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
