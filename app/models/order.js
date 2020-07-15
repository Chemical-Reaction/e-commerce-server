const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  itemList: {
    type: Array,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
