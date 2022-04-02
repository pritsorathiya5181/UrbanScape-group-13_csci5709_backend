const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneno: { type: String, required: true },
    password: { type: String, required: true },
    photoUrl: { type: String },
    about: { type: String },
    address: { type: String },
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
module.exports = User
