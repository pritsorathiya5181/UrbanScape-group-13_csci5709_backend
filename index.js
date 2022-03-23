const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/customer/user')
const authRoute = require('./routes/customer/auth')
const orderRoute = require('./routes/customer/order')

const app = express()

dotenv.config()

app.use(express.json())

//THiS IS ONLY SAMPLE
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log('Connected')
    app.listen(process.env.PORT || 5000)
  })
  .catch((err) => console.log(err))
