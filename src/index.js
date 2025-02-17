require("dotenv").config();

const express = require("express");
const app = express();

// Passport Configuration and Strategies Setup from Configurations
const passport = require("./config/passport");

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

// DB Connection and Server Start
const startServer = async () => {
  await dbConnection();
  app.listen(5000, () => {
    console.log("Server Listening on Port: 5000");
  });
};

startServer();
