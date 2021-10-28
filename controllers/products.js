const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Product } = db

const productsController = {
  create: (req, res, next) => {
    const { authority } = req.user
    if (authority !== 1) {
      return
    }
    const { name, desc, category, img_url, price, market_price, limited } = req.body
    if (!name || !desc || !category || !img_url || !price || !market_price || !limited) {
      const error = new Error('Please enter every field')
      error.statusCode = 422
      next(error)
      return
    }
    
    Product
      .create({
        name,
        desc,
        category,
        img_url,
        price,
        market_price,
        limited
      })
      .then(() => {
        res.send({ 'success':true, 'message':'Product created' })
      })
      .catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      }
    )
  },
  update: (req, res, next) => {
    const { authority } = req.user
    if (authority !== 1) {
      return
    }
    const { name, desc, category, img_url, price, market_price, limited, id, is_deleted } = req.body
    if (!name || !desc || !category || !img_url || !price || !market_price || !limited || !id || is_deleted!==null) {
      const error = new Error('Please enter every field')
      error.statusCode = 422
      next(error)
      return
    }
    Product
      .update({
        name,
        desc,
        category,
        img_url,
        price,
        market_price,
        limited,
        is_deleted
      },
      {
        where: {
          id
        }
      })
      .then(() => {
        res.send({ 'success':true, 'message':'Product update' })
      })
      .catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      }
    )
  },
  find: (req, res, next) => {
    Product
      .findOne({
        where: {
          id:req.params.id
        }
      })
      .then((product) => {
        res.send({ 'success':true, 'message':'Find Product', product })
      })
      .catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      }
    )
  },
  findAllProducts: (req, res, next) => {
    Product
      .findAll({
        raw: true
      })
      .then((products) => {
        res.send({ 'success':true, 'message':'Find Products', products })
      })
      .catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      }
    )
  },
  delete: (req, res, next) => {
    const { authority } = req.user
    if (authority !== 1) {
      return
    }
    Product
      .findOne({
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
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      })
  },
  search: (req, res, next) => {
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
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      })
  }
}

module.exports = productsController
