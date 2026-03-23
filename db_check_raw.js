const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const workers = await User.find({ role: 'worker' }).lean(); // Get raw JS objects
  console.log('--- RAW WORKER DATA ---');
  workers.forEach(w => {
    console.log(JSON.stringify(w, null, 2));
  });
  await mongoose.disconnect();
};

checkData();
