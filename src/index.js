require("dotenv").config();

const express = require("express");
const app = express();
const passport = require("./config/passport");

// Passport Google Strategy Setup
// require("./config/passport");

// DB Connection
const dbConnection = require("./config/db");

// Routes
const indexRoute = require("./routes/index");
const loginRoute = require("./routes/login");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
// const logoutRoute = require("./routes/logout");
const error404Route = require("./routes/erroro404");

// Middlewares
// app.use(express.urlencoded({ extended: true }));
/*app.use(require("cookie-parser")());
app.use(
  require("express-session")({
    secret: "SomeRandomSecretHehehe",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // => Indicates 7 days
    },
  })
); */

app.use(express.json());

// Passport Middlewares
app.use(passport.initialize());

// Routes
app.use("/", indexRoute);
app.use("/login", loginRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
// app.use("/logout", logoutRoute);
app.use("*", error404Route);

// DB Connection
const startServer = async () => {
  await dbConnection();
  app.listen(5000, () => {
    console.log("Server Listening on Port: 5000");
  });
};

startServer();
