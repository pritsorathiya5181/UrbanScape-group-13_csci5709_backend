const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/customer/user')
const authRoute = require('./routes/customer/auth')

const app = express()

dotenv.config()

app.use(express.json())

//THiS IS ONLY SAMPLE
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    console.log('Connected')
    app.listen(process.env.PORT || 5000)
  })
  .catch((err) => console.log(err))
