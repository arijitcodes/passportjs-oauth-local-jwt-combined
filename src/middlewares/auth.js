const jwt = require("jsonwebtoken");

const User = require("../models/User");

/**
 * Middleware to authenticate requests using JWT.
 *
 * This function checks for the presence of a JWT in the Authorization header of the request.
 * If a token is found, it verifies the token and decodes the user information.
 * The user information is then used to fetch the user from the database.
 *
 * If the token is valid and the user is found, the user information is attached to the request object.
 * Otherwise, an appropriate error response is sent.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */

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
