const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

// Local Strategy (email/password)
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Google OAuth2 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            provider: "google",
            providerID: profile.id,
            displayName: profile.displayName,
            firstName: profile._json.given_name,
            lastName: profile._json.family_name,
            email: profile._json.email,
            emailVerified: profile._json.email_verified,
            picture: profile._json.picture,
          });

          await user.save();

          console.log("New User created successfully!");
          console.log("User: ", user);
        } else {
          console.log("User already exists!");
          console.log("User: ", user);
        }
        done(null, user);
      } catch (error) {
        console.log("Error: ", error);
        done(error);
      }
    }
  )
);

// GitHub OAuth2 Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("GitHub Profile: ", profile);

      try {
        const emailsResponse = await require("axios").get(
          "https://api.github.com/user/emails",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const primaryEmail = emailsResponse.data.find(
          (email) => email.primary
        )?.email;

        let user = await User.findOne({ email: primaryEmail });

        if (!user) {
          user = new User({
            provider: "github",
            providerID: profile.id,
            displayName: profile.displayName,
            firstName: profile._json.name.split(" ")[0],
            lastName: profile._json.name.split(" ").slice(1).join(" "),
            email: primaryEmail,
            emailVerified: profile._json.verified,
            picture: profile._json.avatar_url,
          });

          await user.save();
        } else {
          console.log("User already exists!");
          console.log("User: ", user);
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
