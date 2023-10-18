const express = require('express');
const router = express.Router();
const User = require('../models/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /signin route for user sign-in
router.post('/signin', async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // Check if the input is an email or phone number
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign-in.' });
  }
});

module.exports = router;













const otpGenerator = require("otp-generator") ;
const otpGenrate = ()=>{
    const otp = otpGenerator.generate(6 ,{upperCaseAlphabets:false , specialChars:false});

return otp ;
}



const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Your Account SID from www.twilio.com/console
const authToken = 'your_auth_token'; // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

client.messages
  .create({
    body: 'Hello from Node',
    to: '+12345678901', // Text this number
    from: '+12345678901', // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
module.exports = router;
