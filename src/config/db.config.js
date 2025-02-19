const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log('MongoDB connected');
      }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
