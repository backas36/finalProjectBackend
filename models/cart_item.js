"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_item.belongsTo(models.User);
      Cart_item.belongsTo(models.Product);
    }
  }
  Cart_item.init(
    {
      UserId: DataTypes.STRING,
      ProductId: DataTypes.STRING,
      is_empty: DataTypes.BOOLEAN,
      product_quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_item",
    }
  );
  return Cart_item;
};
