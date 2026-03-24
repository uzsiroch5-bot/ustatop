const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  role: {
    type: String,
    enum: ['client', 'worker'],
    default: 'client'
  },
  avatar: {
    type: String,
    default: ''
  },
  notificationSettings: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true }
  },
  otp: {
    type: String
  },
  otpExpires: {
    type: Date
  },
  category: {
    type: String
  },
  location: {
    type: String
  },
    portfolio: {
    type: [String],
    default: []
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
