const mongoose = require("mongoose");


async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/customerInformation", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

module.exports = { connectToDatabase };

