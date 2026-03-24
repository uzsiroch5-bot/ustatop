const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Service'
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'finished'],
    default: 'pending'
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
