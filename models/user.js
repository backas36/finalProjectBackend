'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.TEXT,
    authority: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};