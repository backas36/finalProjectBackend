const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();

const { User, Product, Cart_item } = db;
const Sequelize = require("sequelize");
const order = require("../models/order");
const Op = Sequelize.Op;
function isValidNumber(quantity) {
  const re = /^\+?\d+$/; // 驗證正整數
  return re.test(quantity);
}
const cartController = {
  getAll: async (req, res) => {
    // 取得購物車內所有商品
    await Cart_item.findAll({
      raw: true,
      where: {
        UserId: req.user.id,
        is_empty: false,
      },
      include: [Product, User],
    })
      .then((items) => {
        return res.status(200).json({ success: true, message: items });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, message: err });
      });
  },
  addItem: async (req, res) => {
    // 新增購物車商品
    const { productId, quantity} = req.body;
    const { id } = req.user;
    if (!isValidNumber(quantity)) {
      return res
        .status(400)
        .json({ success: false, message: "Not valid quantity" });
    }
    if (!productId || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "input is empty" });
    }
    const productInfo = await Product.findOne({
      where: { id: productId },
    })
    console.log('productInfo', productInfo)
    if (!productInfo) {
      return res.status(400).json({ success: false, message: "cart is impty" });
    }
    // 還沒做檢查庫存
    const existedCartItem = await Cart_item.findOne({
      where: {
          UserId: req.user.id,
          ProductId: req.body.productId
        }
      })
    console.log('existedCartItem', existedCartItem)
    if (!existedCartItem) {
      Cart_item.create({
        UserId: req.user.id,
        ProductId: req.body.productId,
        is_empty: false,
        product_quantity: req.body.quantity,
      })
        .then(() => {
          return res
            .status(200)
            .json({ success: true, message: "購物車新增不存在商品成功" });
        })
        .catch((err) => {
          return res.status(400).json({ success: false, message: err });
        });
    } else {
      let cartItemQuantity =
        parseInt(existedCartItem.product_quantity) + parseInt(quantity);
      existedCartItem
        .update({
          product_quantity: cartItemQuantity,
        })
        .then(() => {
          return res.status(200).json({ success: true , message: "購物車再次添加相同商品成功"});
        })
        .catch((err) => {
          return res.status(400).json({ success: false , message: err });
        });
    }
  },
  updateItem: async (req, res) => {
    // 編輯購物車商品
    if (!isValidNumber(req.body.quantity)) {
      return res
        .status(400)
        .json({ success: false, message: "Not valid quantity" });
    }
    const { quantity } = req.body;
    const existedCartItem = await Cart_item.findOne({
      where: {
        ProductId: req.params.id,
        UserId: req.user.id,
      },
    })
    console.log('existedCartItem', existedCartItem)
    if (!existedCartItem) {
      return res.status(400).json({ success: false, message: "購物車為空" });
    }
    // 未做庫存功能
    existedCartItem
      .update({
        product_quantity: quantity,
      })
      .then(() => {
        res.status(200).json({ success: true, message: "編輯數量成功" });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, message: err });
      });
  },
  deleteItem: async (req, res) => {
    // 刪除
    const existedCartItem = await Cart_item.findOne({
      where: {
        ProductId: req.params.id,
        UserId: req.user.id,
      },
    })
    if (!existedCartItem)
      return res.status(400).json({ success: false, message: "購物車為空" });
    existedCartItem
      .destroy()
      .then(() => {
        return res.status(200).json({ success: true, message: "刪除成功" });
      })
      .catch((err) => {
        return res.status(400).json({ success: false, message: err });
      });
  },
  deleteAll: async (req, res) => {
    // 清空購物車
    await Cart_item.destroy({
      where: {
        UserId: req.user.id,
      }
    }).then(() => {
      return res.status(200).json({ success: true, message: "刪除用戶購物車所有商品成功" });
    }).catch((err) => {
      return res.status(404).json({ success: false, message: err });
    });
  },
};

module.exports = cartController;
