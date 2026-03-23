const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const testQuery = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  console.log('--- Querying Category: santexnik ---');
  const q1 = { role: 'worker', category: 'santexnik' };
  const w1 = await User.find(q1).lean();
  console.log(`Query: ${JSON.stringify(q1)}`);
  console.log(`Results: ${w1.length} found.`, w1.map(w => w.name));

  console.log('\n--- Querying Category: payvandchi ---');
  const q2 = { role: 'worker', category: 'payvandchi' };
  const w2 = await User.find(q2).lean();
  console.log(`Query: ${JSON.stringify(q2)}`);
  console.log(`Results: ${w2.length} found.`, w2.map(w => w.name));

  await mongoose.disconnect();
};

testQuery();
