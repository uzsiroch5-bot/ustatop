const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const listWorkers = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const workers = await User.find({ role: 'worker' });
  console.log('--- WORKERS IN DB ---');
  workers.forEach(w => {
    console.log(`Name: ${w.name}, Category: ${w.category}, Location: ${w.location}`);
  });
  await mongoose.disconnect();
};

listWorkers();
