const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name field is required']
  }
})

module.exports = mongoose.model('Category', categorySchema);