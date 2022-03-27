const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, unique: true },
    lastname: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    phoneno: {  type: String, required: true, unique: true},
    password: { type: String, required: true },
    
  },
  { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
module.exports = User;
