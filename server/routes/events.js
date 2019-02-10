const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Events = require("../models/Events");
const Rewards = require("../models/Reward");




router.post("/event/:id", (req, res, next) => {
    const {user} = req.body
    const {id} = req.params
  Events.findById( id , (err, event) => {
!event ? res.json((err)=>console.log(err)) :
 event.challenged.includes(user._id) && event.inspectors.includes(user._id)? res.json({type:"private",event}) :
 event.challenged.includes(user._id)? res.json({type:"challenged",event}):
 event.inspectors.includes(user._id)? res.json({type:"inspector",event}) :
  res.json("")
  });
});

router.post("/create", (req, res, next) => {
  res.json(req.body)
  const {email} = req.body

  

  // if (email === "" || password === ""|| name === "") {
  //   return;
  // }

  // const newRewards = new Rewards({
  //   name,
  //   goal,
  //   text,
  //   imgPath,
  //   surprise,
  //   looked
  // });
  //   const newEvent = new Events({
  //     name,
  //     type,
  //     challenged,
  //     inspectors,
  //     objective,
  //     actualValue,
  //     rewards
  //   });

  //   newRewards.save()
  //   .then((e)=>console.log(e))
  //   .catch(err => {
  //     res.json({
  //       message:"Something goes Bad"
  //     })
  //   })
  });


module.exports = router;
