const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a service name']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['electric', 'plumbing', 'repair', 'design', 'cleaning', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
