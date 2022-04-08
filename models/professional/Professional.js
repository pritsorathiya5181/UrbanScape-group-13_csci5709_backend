/**
 * Author: Prit Ajaykumar Sorathiya - B00890175
 */

const mongoose = require('mongoose')

/**
 * ProfessionalSchema is a mongoose schema for professional user collection
 */
const ProfessionalSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneno: { type: String, required: true },
    password: { type: String, required: true },
    experience: { type: String, required: true },
    workinghours: { type: String, required: true },
    preferredservice: { type: String, required: true },
    preferredlocation: { type: String, required: true },
    photoUrl: { type: String },
    about: { type: String },
  },
  { timestamps: true }
)

const ProfessionalUsers = mongoose.model(
  'ProfessionalUsers',
  ProfessionalSchema
)
module.exports = ProfessionalUsers
