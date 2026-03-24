const express = require('express');
const router = express.Router();
const { createService, getServices, getServiceById } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getServices)
  .post(protect, createService);

router.route('/:id').get(getServiceById);

module.exports = router;
