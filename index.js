const express = require('express')
const bodyParser = require('body-parser')
const productsController = require('./controllers/products')
const userController = require('./controllers/users')
const orderController = require('./controllers/orders')
const discountController = require('./controllers/discounts')
const auth = require('./middleware/auth')
const cors = require('cors');

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/createProducts', auth, productsController.create)
app.post('/updateProducts', auth, productsController.update)
app.get('/findProducts/:id', productsController.find)
app.get('/findAllProducts', productsController.findAllProducts)
app.get('/deleteProducts/:id', auth, productsController.delete)
app.get('/searchProducts/:name', productsController.search)

app.post('/register', userController.postRegister)
app.post('/login', userController.postLogin)
app.get('/user', auth, userController.getUser)
app.post('/user', auth, userController.postUpdateUser)
app.post('/update-password', auth, userController.postUpdatePassword)

app.post('/newOrder', auth, orderController.newOrder)
app.get('/getAllOrder', auth, orderController.getAll)
app.get('/getOneOrder/:id', auth, orderController.getOneOrder)
app.get('/deleteOrder/:id', auth, orderController.deleteOrder)
app.get('/acceptOrder/:id', auth, orderController.acceptOrder)
app.get('/completeOrder/:id', auth, orderController.completeOrder)
app.post('/updateOrder', auth, orderController.updateOrder)

app.post('/createDiscounts', auth, discountController.create)
app.post('/updateDiscounts', auth, discountController.update)
app.get('/findDiscounts/:id', auth, discountController.find)
app.get('/findAllDiscounts', auth, discountController.findAllDiscounts)
app.get('/deleteDiscounts/:id', auth, discountController.delete)
app.get('/searchDiscounts/:name', auth, discountController.search)

//錯誤處理的middleware
app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({ success: false, message })
}
)

app.listen(port, () => {
  console.log(`Backend is listening at http://localhost:${port}`)
})
///