const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Product } = db

console.log(Product)
const productsController = {
  create: (req, res) => {
    const { name, desc, img_url, price, market_price, limited } = req.body
    if (!name || !desc || !img_url || !price || !market_price || !limited) {
      res.send({ 'success':false, 'message':'Please enter every field' })
      return
    }
    Product
      .create({
        name,
        desc,
        img_url,
        price,
        market_price,
        limited
      })
      .then(() => {
        res.send({ 'success':true, 'message':'Product created' })
      })
      .catch(err => {
        res.send({ 'success':false, 'message':err.message })
      }
    )
  },
  update: (req, res) => {
    const { name, desc, img_url, price, market_price, limited, id } = req.body
    if (!name || !desc || !img_url || !price || !market_price || !limited) {
      res.send({ 'success':false, 'message':'Please enter every field' })
      return
    }
    Product
      .update({
        name,
        desc,
        img_url,
        price,
        market_price,
        limited
      },
      {
        where: {
          id:id
        }
      })
      .then(() => {
        res.send({ 'success':true, 'message':'Product update' })
      })
      .catch(err => {
        res.send({ 'success':false, 'message':err.message })
      }
    )
  },
  find: (req, res) => {
    const { id } = req.body
    Product
      .findOne({
        attributes: { exclude: ['productId'] },
        where: {
          id:id
        }
      })
      .then((product) => {
        res.send({ 'success':true, 'message':'Find Product', product })
      })
      .catch(err => {
        res.send({ 'success':false, 'message':err.message })
      }
    )
  },
  delete: (req, res) => {
    // 未做權限管理
    Product
      .findOne({
        attributes: { exclude: ['productId'] },
        where: {
          id: req.params.id
        }
      }).then(product => {
        return product.update({
          is_deleted: true
        })
      }).then(() => {
        res.send({ 'success':true, 'message':'Product deleted' })
      }).catch(err => {
        res.send({ 'success':false, 'message': err.message })
      })
  },
  search: (req, res) => {
    Product
      .findAll({
        attributes: { exclude: ['productId'] },
        where: {
          name: {[Op.like]: `%${req.params.name}%`}
        }
      }).then((products) => {
        res.send(
          { 'success':true, 
            'message':'Product search successfully', 
            'data': products
          }
        )
      }).catch(err => {
        res.send({ 'success': false, 'message': err.message })
      })
  }
}

module.exports = productsController
