const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  date: {
    type: String,
    required: false
  },
  active: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

module.exports = orderSchema
