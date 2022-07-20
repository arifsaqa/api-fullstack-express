const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, 'Email  is required']
  },
  name: {
    type: String,
    require: [true, 'Name  is required'],
    maxLength: [225, 'Max length name is 255 character'],
    minLength: [3, 'Min length name is 3 character'],
  },
  username: {
    type: String,
    require: [true, 'Username  is required'],
    maxLength: [225, 'Max length username is 255 character'],
    minLength: [3, 'Min length username is 3 character'],
  },
  password: {
    type: String,
    require: [true, 'Password  is required']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y"
  },
  avatar: {
    type: String,
    
  },
  phone: [{
    type: String,
    require: [true, 'phone number is required'],
    maxLength: [13, 'Max length phone number is 13 character'],
    minLength: [9, 'Min length phone number is 9 character'],
  }],
  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Category'
  }
})

module.exports = mongoose.model('Player', playerSchema);