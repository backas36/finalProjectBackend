const express = require('express')
const bodyParser = require('body-parser')
const productsController = require('./controllers/products')
const auth = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extend: false }))
app.use(bodyParser.json())

app.post('/createProducts', productsController.create)
app.post('/updateProducts', productsController.update)
app.post('/findProducts', productsController.find)

app.listen(port, () => {
  console.log(`Backend is listening at http://localhost:${port}`)
})
///