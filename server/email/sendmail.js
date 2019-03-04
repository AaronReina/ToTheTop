require('dotenv').config();
const transporter = require('./transport');
const fs = require("fs");
const path = require("path");
const hbs = require("handlebars")

const templateFile = path.join(__dirname,'./templates/confirmation.html')
const htmlstr=fs.readFileSync(templateFile).toString();
const template = hbs.compile(htmlstr)

const sendMail = (to, id) => {
    return transporter.sendMail({
      from:'tothetopemail@gmail.com',
      to, 
      subject: "Account confirmation (tothetop)",
      text: "email",
      html: template({
          id:id,
          route:process.env.ROUTE
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }

module.exports = sendMail