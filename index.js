const express = require('express')
const bodyParser = require('body-parser')
const productsController = require('./controllers/products')
const userController = require('./controllers/users')
const orderController = require('./controllers/orders')
const auth = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())

app.post('/createProducts', auth, productsController.create)
app.post('/updateProducts', auth, productsController.update)
app.get('/findProducts/:id', productsController.find)
app.get('/deleteProducts/:id', auth, productsController.delete)
app.get('/searchProducts/:name', productsController.search)

app.post('/register', userController.postRegister)
app.post('/login', userController.postLogin)
app.get('/user', auth, userController.getUser)
app.post('/user', auth, userController.postUpdateUser)
app.post('/update-password', auth, userController.postUpdatePassword)

app.post('/newOrder', auth, orderController.newOrder)
app.get('/getOneOrder/:id', auth, orderController.getOneOrder)
app.get('/deleteOrder/:id', auth, orderController.deleteOrder)

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