const mongoose = require('mongoose')

const ProfessionalSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, unique: true },
    lastname: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    phoneno: {  type: String, required: true, unique: true},
    password: { type: String, required: true },
    experience: {type: String, required: true},
    workinghours: {type: String, required: true},
    preferredservice: {type: String, required: true},
    preferredlocation: {type: String, required: true},
    
  },
  { timestamps: true }
)

const ProfessionalUsers = mongoose.model('ProfessionalUsers', ProfessionalSchema)
module.exports = ProfessionalUsers;
