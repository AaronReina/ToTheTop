const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Events = require("../models/Events");
const Reward = require("../models/Reward");

const bcryptSalt = 10;

mongoose
  .connect(
    "mongodb://localhost/server",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    email: 1,
    password: bcrypt.hashSync("1", bcrypt.genSaltSync(bcryptSalt)),
    name: 1,
    imgPath:
      "https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/userDefault.png",
    invitations: [{name:"invite1",id:"z"}],
    challenged: [{name:"pepe", id:"a"}, {name:"paco", id:"b"}, {name:"pico", id:"c"}],
    inspectors: [{name:"alfredo", id:"h"}, {name:"alfonso", id:"i"}, {name:"maquina", id:"j"}],
    active: true
  },
  {
    email: 2,
    password: bcrypt.hashSync("2", bcrypt.genSaltSync(bcryptSalt)),
    name: 2,
    imgPath:
      "https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/userDefault.png",
    invitations: [{name:"invite2",id:"y"}],
    challenged: [{name:"alfredo", id:"h"}, {name:"alfonso", id:"i"}, {name:"maquina", id:"j"}],
    inspectors: [{name:"pepe", id:"a"}, {name:"paco", id:"b"}, {name:"pico", id:"c"}],
    active: true
  }
];

let events = [
  {
    name: "a",
    type: "Basic",
    challenged: [1],
    inspectors: [2],
    objective: "80",
    actualValue: "70",
    rewards: ["reward1", "reward2"]
  },
  {
    name: "b",
    type: "Basic",
    challenged: [1],
    inspectors: [2],
    objective: "100",
    actualValue: "70",
    rewards: ["reward1"]
  },
  {
    name: "c",
    type: "Basic",
    challenged: [1],
    inspectors: [2],
    objective: "150",
    actualValue: "70",
    rewards: ["reward2", "reward3"]
  },
  {
    name: "h",
    type: "Basic",
    challenged: [2],
    inspectors: [1],
    objective: "150",
    actualValue: "70",
    rewards: ["reward2", "reward3"]
  },
  {
    name: "i",
    type: "Basic",
    challenged: [2],
    inspectors: [1],
    objective: "150",
    actualValue: "70",
    rewards: ["reward2", "reward3"]
  },
  {
    name: "j",
    type: "Basic",
    challenged: [2],
    inspectors: [1],
    objective: "150",
    actualValue: "70",
    rewards: ["reward2", "reward3"]
  }
];

let rewards = [
    {
        name:"reward1",
        goal:"20",
        text: "esta es la reward1",
        imgPath:"https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/fireworks.jpg",
        surprise: false,
        looked: true,
    },
    {
        name:"reward2",
        goal:"40",
        text: "esta es la reward2",
        imgPath:"https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/fireworks.jpg",
        surprise: true,
        looked: false,
    }
    ,
    {
        name:"reward3",
        goal:"50",
        text: "esta es la reward3",
        imgPath:"https://res.cloudinary.com/aaronreina/image/upload/v1549059861/ToTheTop/fireworks.jpg",
        surprise: false,
        looked: false,
    }
  ];

User.deleteMany()
  .then(() => {
    Events.deleteMany();
  })
  .then(() => {
    Reward.deleteMany();
  })
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    return Events.create(events);
  })
  .then(eventsCreated => {
    console.log(
      `${eventsCreated.length} events created with the following id:`
    );
    console.log(eventsCreated.map(u => u._id));
  })
  .then(() => {
    return Reward.create(rewards);
  })
  .then(rewardCreated => {
    console.log(
      `${rewardCreated.length} rewards created with the following id:`
    );
    console.log(rewardCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
