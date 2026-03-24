const Service = require('../models/Service');

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Worker
const createService = async (req, res) => {
  const { name, category, price, location, description } = req.body;

  if (req.user.role !== 'worker') {
    res.status(403);
    throw new Error('Only workers can create services');
  }

  const service = new Service({
    user: req.user._id,
    name,
    category,
    price,
    location,
    description,
  });

  const createdService = await service.save();
  res.status(201).json(createdService);
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category ? { category: req.query.category } : {};

  const count = await Service.countDocuments({ ...category });
  const services = await Service.find({ ...category })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('user', 'name phone avatar');

  res.json({ services, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  const service = await Service.findById(req.params.id).populate('user', 'name phone avatar');

  if (service) {
    res.json(service);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
};

module.exports = { createService, getServices, getServiceById };
