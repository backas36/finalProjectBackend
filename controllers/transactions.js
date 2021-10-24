const jwt = require('jsonwebtoken');
const db = require('../models')
require('dotenv').config();
const Sequelize = require('sequelize');

const { Transaction } = db

const TransactionController = {
  getHotSell: (req, res) => {
    Transaction.findAll({
      attributes: [
        'productId', 
        [Sequelize.fn('sum', Sequelize.col('quantity')), 'total_amount'],
      ],
      group: [
        ['productId']
      ],
    })
      .then(transactions => {
        transactions.sort((a, b) => {
          return b.total_amount - a.total_amount
        })
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  },

  getTractionsByOrderId: (req, res) => {
    Transaction.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = TransactionController;