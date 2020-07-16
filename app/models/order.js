const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  date: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
})

module.exports = orderSchema
