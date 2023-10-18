const express = require('express');
const router = express.Router();
const User = require('../models/schema');
const bcrypt = require('bcrypt');
const customers = require('../model/schema');

// POST /signup route for user sign-up
router.post('/signup', async (req, res) => {
  const { username, phoneNumber , email , password} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      phoneNumber, 
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({ message: 'User signed up successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign-up.' });
  }
});




module.exports = router;
