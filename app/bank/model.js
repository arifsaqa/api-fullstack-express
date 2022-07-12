const mongoose = require('mongoose');

const bankSchema = mongoose.Schema({
  ownerName: {
    type: String,
    require: [true, 'Owner name is required']
  },
  bankName: {
    type: String,
    require: [true, 'Bank name is required']
  },
  bankNumber: {
    type: String,
    require: [true, 'Bank account number is required']
  }
})

module.exports = mongoose.model('Bank', bankSchema);