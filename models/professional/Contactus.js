//Author: Rikin Pineshkumar Patel

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContactusSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contactus', ContactusSchema)
