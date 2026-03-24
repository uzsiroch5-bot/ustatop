const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  isAdminMessage: {
    type: Boolean,
    default: false
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 90 * 24 * 60 * 60 // 90 days in seconds
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
