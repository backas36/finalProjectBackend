const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const db = require('../models')
require('dotenv').config()
const { User } = db

const userController = {
  postRegister: async (req, res, next) => {
    const { username, password, firstname, lastname, phone, email, address } = req.body

    if (!username || !password || !firstname || !lastname || !phone || !email || !address) {
      const error = new Error('Please enter field')
      error.statusCode = 422
      next(error)
      return
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        const error = new Error(err.toString())
        error.statusCode = 500
        next(error)
        return
      }
      try {
        const createUser = await User
          .create({
            username,
            password: hash,
            firstname,
            lastname,
            phone,
            email,
            address,
            authority: 0
          })
        const token = jwt.sign({
          email: createUser.email,
          userId: createUser.id
        },
          'secret',
          { expiresIn: '2h' }
        )
        res.status(201).json({ 'success': true, 'message': 'User created', token })

      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
      }
    })
  },
  postLogin: async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      const error = new Error('Please enter field')
      error.statusCode = 422
      next(error)
      return
    }

    try {
      const user = await User.findOne({
        where: {
          email
        }
      })
      if (!user) {
        const error = new Error('查無此帳號，要不要註冊一個呢?')
        error.statusCode = 401
        next(error)
        return
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          const error = new Error(err.toString())
          error.statusCode = 500
          next(error)
          return
        }
        if (!result) {
          const error = new Error('密碼錯誤')
          error.statusCode = 401
          next(error)
          return
        }

        const token = jwt.sign({
          email: user.email,
          userId: user.id
        },
          'secret',
          { expiresIn: '2h' }
        )
        res.status(200).json({ 'success': true, 'message': '登入成功', token })
      })

    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      return
    }
  },
  getUser: async (req, res, next) => {
    const user = req.user
    res.status(200).json({ 'success': true, 'message': '登入成功', user })
  },
  postUpdateUser: async (req, res, next) => {
    const email = req.user.email
    const { username, firstname, lastname, phone, address } = req.body
    if (!username || !firstname || !lastname || !phone || !address) {
      const error = new Error('Please enter field')
      error.statusCode = 422
      next(error)
      return
    }

    try {
      const user = await User.update({
        username,
        firstname,
        lastname,
        phone,
        address
      }, {
        where: {
          email
        }
      })
      res.status(201).json({ 'success': true, 'message': 'User updated' })
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
  },
  postUpdatePassword: async (req, res, next) => {
    const { password, newPassword, newPassword2 } = req.body
    const { user } = req
    const oldPassword = user.password
    const email = user.email

    if (!password || !newPassword || !newPassword2) {
      const error = new Error('Please enter field')
      error.statusCode = 422
      next(error)
      return
    }

    if (newPassword !== newPassword2) {
      const error = new Error('請確認新密碼是否一致')
      error.statusCode = 422
      next(error)
      return
    }

    try {
      bcrypt.compare(password, oldPassword, (err, result) => {
        if (err) {
          const error = new Error(err.toString())
          error.statusCode = 500
          next(error)
          return
        }
        if (!result) {
          const error = new Error('密碼錯誤')
          error.statusCode = 401
          next(error)
          return
        }

        bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
          if (err) {
            const error = new Error(err.toString())
            error.statusCode = 500
            next(error)
            return
          }

          const user = await User.update({
            password: hash
          }, {
            where: {
              email
            }
          })
          res.status(201).json({ 'success': true, 'message': 'Password updated' })

        })
      })
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      return
    }
  }
}

module.exports = userController