const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "Hello World!<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
  );
});

module.exports = router;
