const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../configs/cloudinary.js");
const sendMail = require("../email/sendmail");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

let loginPromise = (req, user) => {
  return new Promise((resolve, reject) => {
    req.login(user, e => (e ? reject(e) : resolve(user)));
  });
};

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    if (!theUser) return res.status(401).json(failureDetails);
    loginPromise(req, theUser)
      .then(() => res.status(200).json(req.user))
      .catch(e => res.status(500).json({ message: e.message }));
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  console.log("entra signup")
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const imgPath = req.body.imgPath;
console.log(imgPath)
  if (email === "" || password === "" || name === "") {
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      return;
    }
    const list = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let valCode = "";
    for (i=0; i<20; i++) valCode +=list.charAt(Math.floor(Math.random()*list.length)); 
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    sendMail(email,valCode)
    const newUser = new User({
      email,
      password: hashPass,
      name,
      valCode,
      imgPath
    });

    
    newUser
      .save()
      .then(user => loginPromise(req, user).then(user => res.json({ user })))
      .catch(err => {
        res.json({
          message: "Something goes Bad"
        });
      });
  });
});
router.get("/loggedin", (req, res) => {
  const { user } = req;
  if (user) {
    res.json({ user });
  } else {
    res.status(401).json({ succes: "NO USER LOGGED IN" });
  }
});

router.get("/logout", (req, res) => {
  console.log("entra en la ruta logout");
  req.logout();
  res.json({ succes: "Done" });
});

router.post("/image", uploadCloud.single("photo"), (req, res, next) => {
  console.log("manda");
  res.json(req.file);
});
router.get("/confirmation/:id",(req,res,next)=>{
  const id= req.params.id;
  User.findOneAndUpdate({valCode:id},{active:true}).then(()=> {
    res.redirect("http://localhost:8000/")})
  
})

module.exports = router;
