const mongoose = require('mongoose');

const registerationSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    mobile: {
        type: Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
});

const Register = new mongoose.model("Register", registerationSchema);

module.exports = Register;