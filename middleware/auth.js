const jwt = require('jsonwebtoken')
const db = require('../models')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const { User } = db

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded)
    const user = await User.findOne({ where:{ id: decoded.userId } })
    if (!user) { throw new Error() }
    req.token = token
    req.user = user
    next()
  } catch (err) {
    res.status(401).send(err.message)
  }
}
