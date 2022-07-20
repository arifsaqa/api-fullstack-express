const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  historyVoucherTopup: {
    gameName: { type: String, require: [true, 'Game name is required'] },
    category: { type: String, require: [true, 'Game name is required'] },
    thumbnail: { type: String },
    coinName: { type: String, require: [true, 'Coint name is required'] },
    coinQuantity: { type: String, require: [true, 'Coint quantity is required'] },
    price: { type: Number, require: [true, 'Price is required'] },
  },
  historyPayment: {
    name: { type: String, require: [true, 'Name is required'] },
    type: { type: String, require: [true, 'Payment type is required'] },
    bankName: { type: String, require: [true, 'Bank name is required'] },
    noRekening: { type: String, require: [true, 'Bank number is required'] },
  },
  name: {
    type: String,
    require: [true, 'Name is required'],
    maxLength: [225, 'Max length name is 255 character'],
    minLength: [3, 'Min length name is 3 character'],
  },
  accountUser: {
    type: String,
    require: [true, 'Name is required'],
    maxLength: [225, 'Max length name is 255 character'],
    minLength: [3, 'Min length name is 3 character'],
  },
  tax: {
    type: Number,
    default: 0
  },
  value: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'failed', 'success'],
    default: 'pending'
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  historyUser: {
    name: { type: String, require: [true, 'Player name is required'] },
    phoneNumber: {
      type: Number,
      require: [true, 'Phone number is required'],
      maxLength: [13, 'Max length name is 13 character'],
      minLength: [9, 'Min length name is 9 character'],
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

module.exports = mongoose.model('Transaction', transactionSchema);