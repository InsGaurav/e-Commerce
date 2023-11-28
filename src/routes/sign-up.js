const express = require('express');

const app = express();
const router = new express.Router();
const User = require('../model/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const publicPath = path.join(__dirname , "../../public/");
app.use(express.static('public'));
const otpGenerator = require("otp-generator");
const twilio = require('twilio');
const { log } = require('console');
// POST /signup route for user sign-up
let otpOrg;
let newUser;
router.post('/sign-up', async (req, res) => {
  const { username, phoneNumber , email , password} = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = new User({
      username,
      phoneNumber, 
      email,
      password: hashedPassword,
    });

    // const createToken = async ()=>{
    //   const token = await jwt.sign({ username, phoneNumber , email , password},"mynameisshyanwebdeveloper696969",{expiresIn: "2 minutes"});
    //   // const userVar = await jwt.verify(token,"mynameisshyanwebdeveloper696969");
    //   return token;
    // }
    // const userVar = await jwt.verify(await createToken(),"mynameisshyanwebdeveloper696969");
    // console.log(userVar);
     
    try {
      // Check if the input is an email or phone number
      const user = await User.findOne({phoneNumber});
  
      if (user) {
        return res.send("User already exist");
      }
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred during sign-in.' });
    }

    const otpGenAndSend =()=>{
      const otpGenrate = ()=>{
        const otp = otpGenerator.generate(6 ,{digits: true});
        return otp ;
    }
        const accountSid = 'AC25d935222dcdd0d142301d07e2a58ec2';
        const authToken = 'f708880681f733ed8b4cd45274e248d5';
        const client = twilio(accountSid, authToken);
        const recipientPhoneNumber = '+91' + (req.body.phoneNumber); // Replace with the recipient's phone number
        const otp = otpGenrate(); // Replace with your generated OTP
        console.log(otp);
    
        client.messages.create({
        to: recipientPhoneNumber,
        from: '+12546131995', // You should have a Twilio phone number to use here
        body: `Your OTP is: ${otp}`,
      })
      .then(message => console.log(`OTP sent with SID: ${message.sid}`))
      .catch(error => console.error(`Error sending OTP: ${error.message}`));

      return otp;
    }
    otpOrg = otpGenAndSend();
    res.send("success");
    // const result = await newUser.save();
    
    // res.json({ message: 'User signed up successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign-up.' });
  }
});

router.post("/sign-up-auth", async (req, res) => {
  try {
    if (req.body.otp == otpOrg) {
      const result = await newUser.save();
      console.log('done');
      console.log(result);
      res.send('correct'); // Send a single response here
    } else {
      res.status(400).send("Incorrect OTP"); // Send an error response if OTP is incorrect
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during sign-up.' });
  }
})




module.exports = router;
