const express = require("express");
const router = express.Router();
const Events = require("../models/Events");
const Rewards = require("../models/Reward");
const User = require("../models/User");

router.post("/event/:id", (req, res, next) => {
  const { user } = req.body;
  const { id } = req.params;
  Events.findById(id, (err, event) => {
    !event
      ? res.json(err => console.log(err))
      : event.challenged.includes(user._id) &&
        event.inspectors.includes(user._id)
      ? res.json({ type: "private", event })
      : event.challenged.includes(user._id)
      ? res.json({ type: "challenged", event })
      : event.inspectors.includes(user._id)
      ? res.json({ type: "inspector", event })
      : res.json("");
  });
});


router.post("/searchUser/:id", (req, res, next) => {
  const { id } = req.params;

  const regularExp=(filter)=>new RegExp(filter,"i");
  User.find({ email: regularExp(id)})
  .then(( user) => {
    !user?
  res.json("no user found"):
  res.json(user)
  
  }).catch(err => console.log(err)); 
})

router.post("/create", (req, res, next) => {
  const { event, rewards } = req.body.state;
  Rewards.create(rewards).then(r => {
    const newEvent = new Events({
      name: event.name,
      type: event.type,
      challenged: event.name,
      inspectors: event.inspectors,
      objective: event.objective,
      actualValue: "",
      rewards: r.map(e=>e._id)
    });

    newEvent.save().then(e => res.json(e));

    ;
  });
});

module.exports = router;
