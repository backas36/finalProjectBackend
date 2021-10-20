const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Discount } = db

const DiscountsController = {
  create: (req, res, next) => {
    const { authority } = req.user
    if (authority !== 1) {
      return
    }
    const { desc, price, threshold, shipment } = req.body
    if (!desc || !threshold || !price || !shipment ) {
      const error = new Error('Please enter every field')
      error.statusCode = 422
      next(error)
      return
    }
    
    Discount
      .create({
        desc, 
        price, 
        threshold, 
        shipment
      })
      .then(() => {
        res.send({ 'success':true, 'message':'Discount created' })
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
    const { desc, price, threshold, shipment, is_deleted, id } = req.body
    if (!desc || !threshold || !price || !shipment || !is_deleted) {
      const error = new Error('Please enter every field')
      error.statusCode = 422
      next(error)
      return
    }
    Discount
      .update({
        desc, 
        price, 
        threshold, 
        shipment,
        is_deleted
      },
      {
        where: {
          id
        }
      })
      .then(() => {
        res.send({ 'success':true, 'message':'Discount update' })
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
    Discount
      .findOne({
        where: {
          id:req.params.id
        }
      })
      .then((Discount) => {
        res.send({ 'success':true, 'message':'Find Discount', Discount })
      })
      .catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      }
    )
  },
  findAllDiscounts: (req, res, next) => {
    Discount
      .findAll({
        raw: true
      })
      .then((Discounts) => {
        res.send({ 'success':true, 'message':'Find Discounts', Discounts })
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
    Discount
      .findOne({
        where: {
          id: req.params.id
        }
      }).then(Discount => {
        return Discount.update({
          is_deleted: true
        })
      }).then(() => {
        res.send({ 'success':true, 'message':'Discount deleted' })
      }).catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      })
  },
  search: (req, res, next) => {
    Discount
      .findAll({
        attributes: { exclude: ['DiscountId'] },
        where: {
          desc: {[Op.like]: `%${req.params.name}%`}
        }
      }).then((Discounts) => {
        res.send(
          { 'success':true, 
            'message':'Discount search successfully', 
            'data': Discounts
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

module.exports = DiscountsController
