require('dotenv').config();
const transporter = require('./transport');
const fs = require("fs");
const path = require("path");
const hbs = require("handlebars")

const templateConfir = path.join(__dirname,'./templates/template_verify.html')
const htmlConfir=fs.readFileSync(templateConfir).toString();
const templateConfirmation = hbs.compile(htmlConfir)

const templateChal = path.join(__dirname,'./templates/challenged.html')
const htmlChal=fs.readFileSync(templateChal).toString();
const templateChallenged = hbs.compile(htmlChal)

const templateIns = path.join(__dirname,'./templates/inspector.html')
const htmlIns=fs.readFileSync(templateIns).toString();
const templateInspector = hbs.compile(htmlIns)

const templateUnl = path.join(__dirname,'./templates/unlocked_advice.html')
const htmlUnl=fs.readFileSync(templateUnl).toString();
const templateUnlocked = hbs.compile(htmlUnl)

const templateWar = path.join(__dirname,'./templates/unlocked_warning.html')
const htmlWar=fs.readFileSync(templateWar).toString();
const templateWarning= hbs.compile(htmlWar)

const sendMailConfirmation = (to, id) => {
    return transporter.sendMail({
      from:'tothetopemail@gmail.com',
      to, 
      subject: "Account confirmation (tothetop)",
      text: "email",
      html: templateConfirmation({
          id:id,
          route:process.env.ROUTE
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }

  const sendMailChallenged = (to,name) => {
    return transporter.sendMail({
      from:'tothetopemail@gmail.com',
      to, 
      subject: "You have a challengue (tothetop)",
      text: "email",
      html: templateChallenged({
          name:name,
        
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }
  const sendMailInspectors = (to,name) => {
    return transporter.sendMail({
      from:'tothetopemail@gmail.com',
      to, 
      subject: "Somebody need an inspector (tothetop)",
      text: "email",
      html: templateInspector({
          name:name,
        
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }

  const sendMailUnlocked = (to,name) => {
    return transporter.sendMail({
      from:'tothetopemail@gmail.com',
      to, 
      subject: "You have a reward waiting for you! (tothetop)",
      text: "email",
      html: templateUnlocked({
          name:name,
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }

  const sendMailAsk = (to,name,challenged) => {
    return transporter.sendMail({
      from:'tothetopemail@gmail.com',
      to, 
      subject: "Somebody needs your inspection (tothetop)",
      text: "email",
      html: templateWarning({
          name:name,
          challenged,challenged
      })
    })
    .then(info => console.log(info)).catch(e=>console.log(e))
  }




module.exports = {sendMailConfirmation,sendMailChallenged,sendMailInspectors,sendMailUnlocked,sendMailAsk}