const express = require('express');
const router = express.Router();
const User = require('../models/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require("otp-generator");
const twilio = require('twilio');

// POST /signin route for user sign-in (Step 1)
router.post('/signin', async (req, res) => {
  
  const { emailOrPhone } = req.body;

  try {
    // Check if the input is an email or phone number
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Render the "sign-in-password.html" page for the next step
    res.render("sign-in-password.html");
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign-in.' });
  }
});

// POST /sign-in-password route for entering the password (Step 2)
router.post('/sign-in-password', async (req, res) => {
  const { password } = req.body;

  try {
    // Verify the password against the user's record
    const user = await User.findOne({ /* Find the user by email/phone */ });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Render the "sign-in-authentication.html" page for the next step
    res.render("sign-in-authentication.html");
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during password validation.' });
  }
});

// POST /sign-in-authentication route for generating and sending OTP (Step 3)
router.post('/sign-in-authentication', async (req, res) => {
  const { phone } = req.body; // User's phone number

  // Generate an OTP
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

  // Send the OTP using Twilio
  const accountSid = 'your_account_sid';
  const authToken = 'your_auth_token';
  const client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      to: phone, // User's phone number
      from: 'your_twilio_number', // From a valid Twilio number
    })
    .then((message) => {
      console.log('OTP sent:', message.sid);
      res.json({ message: 'OTP sent successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error sending OTP' });
    });
});

module.exports = router;
