const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email  is required']
  },
  name: {
    type: String,
    require: [true, 'Name  is required']
  },
  password: {
    type: String,
    require: [true, 'Password  is required']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default:'user'
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y"
  },
  phone: [{
    type: String,
    require:[true, 'phone number is required']
  }]
})

module.exports = mongoose.model('User', userSchema);