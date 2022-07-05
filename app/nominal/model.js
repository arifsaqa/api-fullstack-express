const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
  cointName: {
    type: String,
    require: [true, 'Coint name is required']
  },
  cointQuantity: {
    type: Number,
    require: [true, 'Name field is required']
  },
  price: {
    type: Number,
    default:0
  }
})

module.exports = mongoose.model('Nominal', coinSchema);