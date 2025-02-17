const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const oauthProviders = require("../config/oauthProviders");

// Generate JWT
const generateJWT = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Local Authentication (POST) - Registration
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      provider: "local", // Set provider to "local" for local registration
      providerID: null, // No providerID for local registration
      displayName: `${firstName} ${lastName}`, // Combine firstName and lastName for displayName
      firstName,
      lastName,
      email,
      password, // The password will be hashed automatically by the pre("save") middleware
      emailVerified: false, // Default to false for local registration
      picture: null, // No picture for local registration
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT for the new user (optional)
    const token = generateJWT(newUser);

    // Return the token (or just a success message)
    res.status(201).json({ token });
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Local Authentication (POST)
router.post("/local", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ error: info?.message || "Login failed" });
    }

    const token = generateJWT(user);
    res.json({ token });
  })(req, res, next);
});

// Unified OAuth 2.0 login route
router.get("/:provider", (req, res, next) => {
  const provider = req.params.provider;
  const clientType = req.query.client_type; // 'web' or 'mobile'

  // Handle OAuth2 authentication
  if (!oauthProviders[provider]) {
    return res.status(400).json({ error: "Unsupported provider" });
  }

  passport.authenticate(provider, {
    scope: oauthProviders[provider].scope,
    state: clientType,
  })(req, res, next);
});

// Unified OAuth2 callback
router.get(
  "/:provider/callback",
  (req, res, next) => {
    const provider = req.params.provider;
    const clientType = req.query.state; // Retrieve client_type from state

    console.log(" ----- IN CALLBACK -----");
    console.log("Client Type: ", clientType);

    req.clientType = clientType;

    passport.authenticate(provider, { session: false })(req, res, next);
  },
  (req, res) => {
    console.log(" ----- CALLBACK AUTH DONE -----");

    const token = generateJWT(req.user);

    console.log("TOKEN IS GENERATED: ", token);

    // Check if the request is from the web app or mobile app
    // const isWebApp = req.headers.referer?.includes("http://localhost:3000");
    const isWebApp = req.clientType === "web";

    console.log("REQ HEADERS: ", req.headers);
    console.log("Is WebApp: ", isWebApp);

    if (isWebApp) {
      // Redirect to the web app with the token
      res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
    } else {
      // Redirect to the mobile app with the token
      //   res.redirect(`myapp://oauth-callback?token=${token}`);
      console.log("MOBILE APP REDIRECT");
      res.redirect(`http://example.com?token=${token}`);
    }
  }
);

module.exports = router;
