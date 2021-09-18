'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Oder.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    accepted_at: DataTypes.DATE,
    completed_at: DataTypes.DATE,
    is_accepted: DataTypes.BOOLEAN,
    price: DataTypes.INTEGER,
    sum: DataTypes.INTEGER,
    discount_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Oder',
  });
  return Oder;
};