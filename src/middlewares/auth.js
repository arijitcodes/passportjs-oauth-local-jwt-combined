const jwt = require("jsonwebtoken");

const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized request! No token provided.");
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).send("Unauthorized request! Invalid token.");
  }
};

module.exports = isAuthenticated;
