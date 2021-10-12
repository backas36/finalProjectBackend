const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();

const { Product } = db

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
          id
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
        where: {
          id
        }
      })
      .then((product) => {
        res.send({ 'success':true, 'message':'Find Product', product })
      })
      .catch(err => {
        res.send({ 'success':false, 'message':err.message })
      }
    )
  }
}

module.exports = productsController
