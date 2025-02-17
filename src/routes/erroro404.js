const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).send("Error 404! Page Not Found!");
});

module.exports = router;
