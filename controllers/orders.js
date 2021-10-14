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
    Order.findOne({
      where: {
        id: req.params.id,
      },
    }).then((order) => {
      if (!order)
        return res.send({ success: false, message: "sorry there is no order" });
      // 先略
    });
  },

  deleteOrder: (req, res) => {
    // 商家拒單
    Order.destroy();
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