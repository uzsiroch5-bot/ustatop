const express = require('express');
const router = express.Router();
const { updateUserProfile, getUserProfile, getWorkers } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/workers', getWorkers);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
