const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const oauthProviders = require("./oauthProviders");

// A function to configure the OAuth 2.0 strategies dynamically based on the configuration file - 'oauthProviders'

/**
 * This function configures the OAuth 2.0 strategies dynamically based on the
 * configuration provided in the 'oauthProviders' file.
 *
 * It sets up Passport.js strategies for different OAuth providers by using the
 * strategy, client ID, client secret, and callback URL specified in the configuration.
 *
 * If any custom logic is required for a specific provider, it is executed before
 * creating or finding the user in the database.
 *
 * @param {string} providerName - The name of the OAuth provider (e.g., 'google', 'github').
 * @param {object} providerConfig - The configuration object for the provider.
 */

const configureOAuthStrategy = (providerName, providerConfig) => {
  passport.use(
    new providerConfig.strategy(
      {
        clientID: providerConfig.clientID,
        clientSecret: providerConfig.clientSecret,
        callbackURL: providerConfig.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (providerConfig.customLogic) {
            await providerConfig.customLogic(accessToken, profile);
          }

          let user = await User.findOne({ email: profile.emails[0].value });

          if (!user) {
            user = new User({
              provider: providerName,
              providerID: profile.id,
              displayName: profile.displayName || profile.username,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
            });

            await user.save();

            console.log("New User created successfully!");
            console.log("User: ", user);
          } else {
            console.log("User already exists!");
            console.log("User: ", user);
          }

          return done(null, user);
        } catch (err) {
          console.log("Error: ", err);
          return done(err, false);
        }
      }
    )
  );
};

// Configure all OAuth providers
Object.keys(oauthProviders).forEach((providerName) => {
  configureOAuthStrategy(providerName, oauthProviders[providerName]);
});

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

module.exports = passport;
