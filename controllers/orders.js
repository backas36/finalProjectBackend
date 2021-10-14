const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

const { Order, Product, Transaction, Discount } = db;
const Sequelize = require("sequelize");
const order = require("../models/order");
//const { JSON } = require("sequelize/types/lib/utils");
const Op = Sequelize.Op;

const isDiscount = async (total) => {
  const discountList = await Discount.findAll({ raw: true })
  if (!discountList) return false
  discountList.sort((a,b)=> b.threshold - a.threshold)
  for (let discount of discountList) {
    if (total > discount.threshold && !discount.is_deleted) {
      return discount
    }
  }
  return false
}

const orderController = {
  
  getAll: (req, res) => {
    // 取得全部訂單
    const { authority } = req.user
    if (authority !== 1) {
      return
    }
    Order.findAll({})
      .then((orders) => {
        if (!orders || orders.length === 0) {
          return res.send({
            success: true,
            message: "sorry there is no order",
          });
        }
        res.send({
          success: true,
          message: "get all orders successfully",
          data: orders,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err.message,
        });
      });
  },

  getOneOrder: (req, res) => {
    // 取得單一訂單
    const { id, authority } = req.user
    Order.findOne({
      where: {
        id: req.params.id,
      },
    }).then((order) => {
      if (order.userId!==id && authority !==1) return
      if (!order) return res.send({ success: false, message: "sorry there is no order" });
      res.send({
        success: true,
        message: "Get an Order",
        data: order,
      });
    });
  },

  deleteOrder: (req, res, next) => {
    // 商家拒單
    const { authority } = req.user
    if (authority !== 1) {
      const error = new Error('Not authorized')
      error.statusCode = 500
      next(error)
      return
    }
    Order
      .findOne({
        where: {
          id: req.params.id,
        }
      }).then(order => {
        return order.update({
          is_accepted: false,
          accepted_at: Date.now()
        })
      }).then(() => {
        res.send({ 'success':true, 'message':'Order is rejected' })
      }).catch(err => {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      })
  },

  newOrder: async (req, res) => {
    // 成立訂單 [{"id":1, "name": "cake", "number":1}, {"id":2, "name": "tea", "number":1}]
    const clientResult = JSON.parse(req.body.data)
    const { id } = req.user
    let price = 0
    let sum = 0
    const orderObj = await Order.create({ 
        userId:id,
        accepted_at: null,
        completed_at: null,
        is_accepted: null,
        price:null,
        sum:null
      },
      { 
        omitNull: false 
      })
    // create transactions
    for (let product of clientResult) {
      //product = JSON.parse(product)
      const prod = await Product.findOne({ where: { id: product.id } })
      await Transaction.create({ orderId:orderObj.id, productId:prod.id, quantity:product.number })
      sum += prod.price*product.number
    }
    // add discount
    const discount = await isDiscount(sum)
    if (discount) {
      price = sum + discount.price
    }

    // update order
    const orderObjUpdate = await Order.update({ sum, price, discountId:discount.id }, { where: { id:orderObj.id } })
    res.send({ 
      success:true,
      data:orderObjUpdate
     })
  }

};

module.exports = orderController;