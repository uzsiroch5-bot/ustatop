const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

console.log('Connecting to:', MONGO_URI.replace(/:([^:@]+)@/, ':****@')); // Hide password for security

const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ SUCCESS: Connected to MongoDB successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ FAILURE: Could not connect to MongoDB.');
    console.error('Error Code:', error.code);
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    
    if (error.message.includes('bad auth')) {
      console.log('\n--- Troubleshooting Tips ---');
      console.log('1. Verify your username and password in MongoDB Atlas (Database Access).');
      console.log('2. Ensure the user has "Read and write to any database" role.');
      console.log('3. check if your password contains special characters like @, :, /, or ? and needs URL encoding.');
      console.log('4. Ensure there are no leading or trailing spaces in your .env file.');
    } else if (error.name === 'MongooseServerSelectionError') {
      console.log('\n--- Troubleshooting Tips ---');
      console.log('1. Check your Internet connection.');
      console.log('2. Ensure your IP address is whitelisted in MongoDB Atlas (Network Access). Try setting it to 0.0.0.0/0');
    }
    
    process.exit(1);
  }
};

testConnection();
