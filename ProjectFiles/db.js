const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/fundraiser');
    console.log(`Connection successful: ${conn.connection.host}`);
  } catch (error) {
    console.error(`No connection: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;