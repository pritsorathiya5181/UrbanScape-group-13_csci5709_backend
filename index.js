const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/customer/user')
const authRoute = require('./routes/customer/auth')
const orderRoute = require('./routes/customer/order')
const cartRoute = require('./routes/customer/cart')
const newsletterSubscriptionRoute = require('./routes/customer/newsletterSubscription')
const servicesRouteCategory = require('./routes/services')
const serviceRoute = require('./routes/professional/service')
const supportRoute = require('./routes/professional/support')
const reviewRoute = require('./routes/customer/reviews')

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
app.use('/api/services', servicesRouteCategory)
app.use('/api/subscribe', newsletterSubscriptionRoute)
app.use('/api/reviews',reviewRoute)
app.use('/api/service', serviceRoute)
app.use('/api/support', supportRoute)


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

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log('Connected to mongoDB successfully!')
    app.listen(PORT)
  })
  .catch((err) => console.log(err))

module.exports = app
