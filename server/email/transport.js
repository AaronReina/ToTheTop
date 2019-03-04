require('dotenv').config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tothetopemail@gmail.com',
      pass: process.env.MAILPASS
    }
});

module.exports=transporter