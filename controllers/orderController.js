const Order = require('../models/Order');

// @desc    Create a new order request
// @route   POST /api/orders
// @access  Private/Client
const createOrder = async (req, res) => {
  const { worker, service, description } = req.body;

  if (req.user.role !== 'client') {
    res.status(403);
    throw new Error('Only clients can create orders');
  }

  const order = new Order({
    client: req.user._id,
    worker,
    service,
    description,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Worker
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    if (order.worker.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this order');
    }

    order.status = status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
  const filter = req.user.role === 'client' ? { client: req.user._id } : { worker: req.user._id };
  const orders = await Order.find(filter)
    .populate('client', 'name phone')
    .populate('worker', 'name phone')
    .populate('service', 'name category');
  res.json(orders);
};

module.exports = { createOrder, updateOrderStatus, getMyOrders };
