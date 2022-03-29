const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/customer/user')
const authRoute = require('./routes/customer/auth')
const orderRoute = require('./routes/customer/order')
const cartRoute = require('./routes/customer/cart')
const newsletterSubscriptionRoute = require('./routes/customer/newsletterSubscription')
const servicesRoute = require('./routes/services')
const serviceRoute = require('./routes/professional/service')

const app = express()

dotenv.config()

app.use(cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// API routes
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)
app.use('/api/cart', cartRoute)
app.use('/api/services', servicesRoute)
app.use('/api/subscribe', newsletterSubscriptionRoute)

app.use('/api/service', serviceRoute)

app.get('/', (req, res, next) => {
  console.log('index route ')
  res.status(200).json({
    status: 'success',
  })
})

app.get('*', function (req, res) {
  console.log('404ing')
  res.send('404')
})

mongoose
  .connect(
    // 'mongodb+srv://admin:admin@group13.jsfp6.mongodb.net/OrderManagement?retryWrites=true&w=majority'
     'mongodb+srv://janhavi99:janhavi12@cluster0.1nksu.mongodb.net/UrbanDatabase?retryWrites=true&w=majority'
    )
  .then((result) => {
    console.log('Connected to mongoDB successfully')
    app.listen(5000)
  })
  .catch((err) => console.log(err))

module.exports = app
