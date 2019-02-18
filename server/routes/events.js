const express = require("express");
const router = express.Router();
const Events = require("../models/Events");
const Rewards = require("../models/Reward");
const User = require("../models/User");

router.post("/type/:id", (req, res, next) => {
  const { user } = req.body;
  const { id } = req.params;
  Events.findById(id, (err, event) => {
    let typeFinal;
    !event
      ? res.json(err => console.log(err))
      : event.privated.indexOf(user._id) != -1
      ? (typeFinal = "private")
      : event.challenged == user._id
      ? (typeFinal = "challenged")
      : event.inspectors.indexOf(user._id) != -1
      ? (typeFinal = "inspector")
      : res.json("");
    res.json({ type: typeFinal, event });
  });
});

router.post("/unLock/:id", (req, res, next) => {
  const { id } = req.params;
  Rewards.findByIdAndUpdate(id, {
        locked:false
      })
    .then(e => res.json(e))
    .catch(e => console.log(e));
});

router.post("/actualValue/:id", (req, res, next) => {
  const { id } = req.params;
  const { progress, photo } = req.body.state;
  console.log(id)
  console.log(progress)
  console.log(photo)
  Events.findByIdAndUpdate(id, {
    actualValue:progress , imgPath:photo 
      })
    .then(e => res.json(e))
    .catch(err => console.log(err));
});

router.post("/complete/:id", (req, res, next) => {
  const { id } = req.params;
  Rewards.findByIdAndUpdate(id, {
        locked:false,
        done:true,
        surprise:false
      })
    .then(e => res.json(e))
    .catch(e => console.log(e));
});

router.post("/populate/:id", (req, res, next) => {
  const { id } = req.params;
  Events.findById(id)
    .populate("rewards challenged privated inspectors")
    .then(e => res.json(e))
    .catch(e => console.log(e));
});

router.post("/searchUser/:id", (req, res, next) => {
  const { id } = req.params;

  const regularExp = filter => new RegExp(filter, "i");
  User.find({ email: regularExp(id) })
    .then(user => {
      !user ? res.json("no user found") : res.json(user);
    })
    .catch(err => console.log(err));
});
router.post("/accept/:id", (req, res, next) => {
  const { id } = req.params;
  let { user } = req.body;
  console.log(id, user);
  let challengedId = [];
  user.invitationCha.forEach(e => challengedId.push(e.id));
  let inspectorsId = user.invitationIns.map(e => e.id);
  console.log(inspectorsId);

  if (challengedId.indexOf(id) != -1) {
    let cutCha = user.invitationCha.splice(challengedId.indexOf(id), 1);
    user.challenged.push(...cutCha);
    console.log("challenged");
  } else if (inspectorsId.indexOf(id) != -1) {
    let cutIns = user.invitationIns.splice(inspectorsId.indexOf(id), 1);
    user.inspectors.push(...cutIns);

    console.log("inspector");
  }
  User.findByIdAndUpdate(user._id, {
    invitationCha: user.invitationCha,
    invitationIns: user.invitationIns,
    challenged: user.challenged,
    inspectors: user.inspectors
  }).then(user => res.json(user));
});

router.post("/reject/:id", (req, res, next) => {
  const { id } = req.params;
  let { user } = req.body;
  console.log(id, user);
  let challengedId = [];
  user.invitationCha.forEach(e => challengedId.push(e.id));
  let inspectorsId = user.invitationIns.map(e => e.id);
  console.log(inspectorsId);

  if (challengedId.indexOf(id) != -1) {
    user.invitationCha.splice(challengedId.indexOf(id), 1);
    console.log("challenged");
  } else if (inspectorsId.indexOf(id) != -1) {
    user.invitationIns.splice(inspectorsId.indexOf(id), 1);
    console.log("inspector");
  }
  User.findByIdAndUpdate(user._id, {
    invitationCha: user.invitationCha,
    invitationIns: user.invitationIns
  }).then(user => res.json(user));
});

router.post("/create", (req, res, next) => {
  const { event, rewards } = req.body.state;
  Rewards.create(rewards)
    .then(r => {
      const newEvent = new Events({
        name: event.name,
        type: event.type,
        objective: event.objective,
        actualValue: "",
        rewards: r.map(e => e._id)
      });
      console.log(event.privated);
      if (event.privated != "") {
        console.log("esprivado");
        newEvent.privated = event.privated;
      } else {
        console.log("no es esprivado");
        newEvent.challenged = event.challenged;
        newEvent.inspectors = event.inspectors;
      }

      newEvent.save().then(e => {
        User.findByIdAndUpdate(e.privated, {
          $push: {
            privated: { name: e.name, id: e._id }
          }
        }).then(e => console.log(e));
        User.findByIdAndUpdate(e.challenged, {
          $push: { invitationCha: { name: e.name, id: e._id } }
        }).then(_ => {
          console.log(e);
          e.inspectors.forEach(element => {
            User.findByIdAndUpdate(element, {
              $push: { invitationIns: { name: e.name, id: e._id } }
            }).then(e => console.log(e));
          });
        });
      });
    })
    .then(e => res.json(e));
});

module.exports = router;
