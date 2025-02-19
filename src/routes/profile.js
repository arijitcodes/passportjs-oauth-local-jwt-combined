const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  if (req.user) {
    console.log("User: ", req.user);
    /* return res.send(
      "Secret Data<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
    ); */
    return res.json(req.user);
  } else {
    return res
      .status(401)
      .send(
        "Unauthorized request!<br><br><a href='/login'>LogIn</a> | <a href='/logout'>Logout</a> | <a href='/profile'>Profile</a>"
      );
  }
});

module.exports = router;
