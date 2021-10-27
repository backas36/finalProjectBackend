const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();
const Sequelize = require('sequelize');

const { Transaction, Product } = db

const TransactionController = {
  getHotSell: (req, res) => {
    Transaction.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'total_amount'],
      ],
      include: [
        {
          model: Product,
        }
      ],
      group: [
        ['Product.id']
      ]
    })
      .then(transactions => {
        transactions.sort((a, b) => {
          return b.total_amount - a.total_amount
        })
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  },

  getTractionsByOrderId: (req, res) => {
    Transaction.findAll({
      where: {
        orderId: req.params.orderId
      },
      include: [
        {
          model: Product,
        }
      ]
    })
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          message: err.message
        })
      })
  }
}

module.exports = TransactionController;