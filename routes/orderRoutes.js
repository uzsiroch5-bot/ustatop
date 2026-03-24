const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus, getMyOrders } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createOrder)
  .get(protect, getMyOrders);

router.route('/:id').put(protect, updateOrderStatus);

module.exports = router;
