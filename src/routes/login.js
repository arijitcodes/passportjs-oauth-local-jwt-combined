const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "Login With: <a href='/auth/google'>Google</a> | <a href='/auth/github'>GitHub</a> | <a href='/auth/facebook'>Facebook</a><br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
  );
});

module.exports = router;
