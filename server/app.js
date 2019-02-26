require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL, {useNewUrlParser:true})

  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("../package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: function(origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};

// Middleware Setup
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.use(express.static(path.join(__dirname, "public")));

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// Enable authentication using session + passport
app.use(
  session({
    secret: "irongenerator",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
require("./passport")(app);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const events = require("./routes/events");
app.use("/events", events);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
