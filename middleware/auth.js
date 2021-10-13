const jwt = require('jsonwebtoken')
const db = require('../models')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const { User } = db

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, '98d31c7649881ec6eb2cef1052d428614d4d984a88f41f3570e5dc9c48fd21c38b4013eede016417bf26e81243dd842248491bc47f84c3dc5595cf32cd415f1a')
    console.log(decoded)
    const user = await User.findOne({ username: decoded.username })
    if (!user) { throw new Error() }
    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.status(401).send(err.message)
  }
}