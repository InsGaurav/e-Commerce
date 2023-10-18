const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// Define a schema for the contact
const customerInfoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true, // Ensures that phone numbers are unique in the database
  },
  email: {
    type: String ,
    unique:true ,
  },

  password: {
    type: String,
    required: true,
    },
});


//hash the password before save
customerInfoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    const saltRounds = 10;
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });

// Create a model from the schema
const customers = mongoose.model('customers', customerInfoSchema);







module.exports = customers;
