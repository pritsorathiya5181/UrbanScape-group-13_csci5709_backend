const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/customer/user')
const authRoute = require('./routes/customer/auth')
const orderRoute = require('./routes/customer/order')
const cartRoute = require('./routes/customer/cart')
const serviceRoute = require('./routes/professional/service')

const app = express()

dotenv.config()

app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

//THiS IS ONLY SAMPLE
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', cartRoute)

app.use('/api/service', serviceRoute)

app.get('*', function (req, res) {
  console.log('404ing')
  res.send('404')
})

mongoose
  .connect(
    process.env.MONGO_URL ||
      'mongodb+srv://admin:admin@group13.jsfp6.mongodb.net/OrderManagement?retryWrites=true&w=majority'
  )
  .then((result) => {
    console.log('Connectted to mongoDB')
    app.listen(process.env.PORT || 5000)
  })
  .catch((err) => console.log(err))
