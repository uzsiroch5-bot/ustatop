const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.notificationSettings = req.body.notificationSettings || user.notificationSettings;
    user.avatar = req.body.avatar || user.avatar;
    user.portfolio = req.body.portfolio || user.portfolio;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      role: updatedUser.role,
      category: updatedUser.category,
      location: updatedUser.location,
      avatar: updatedUser.avatar,
      portfolio: updatedUser.portfolio,
      token: req.headers.authorization.split(' ')[1], // reuse token
      notificationSettings: updatedUser.notificationSettings
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Get all workers
// @route   GET /api/users/workers
// @access  Public
const getWorkers = async (req, res) => {
  try {
    const { category, location } = req.query;
    const query = { role: 'worker' };

    if (category) query.category = category;
    if (location) query.location = { $regex: new RegExp(location, 'i') };

    console.log('Worker Query:', JSON.stringify(query));
    const workers = await User.find(query).select('-password');
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateUserProfile, getUserProfile, getWorkers };
