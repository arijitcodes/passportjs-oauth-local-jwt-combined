/**
 * This file contains the configuration for various OAuth 2.0 providers.
 * Each provider's configuration includes the strategy, client ID, client secret,
 * callback URL, and any additional scope or custom logic required for the provider.
 *
 * The configuration is used to dynamically set up Passport.js strategies for
 * authentication with different OAuth providers.
 *
 * Example:
 * - Google OAuth 2.0 configuration includes the strategy, client ID, client secret,
 *   callback URL, and scope for profile and email.
 * - GitHub OAuth 2.0 configuration includes the strategy, client ID, client secret,
 *   callback URL, scope for user email, and custom logic to fetch the primary email.
 *
 * To add a new OAuth provider, simply add a new entry to this file with the required
 * configuration.
 */

module.exports = {
  google: {
    strategy: require("passport-google-oauth20").Strategy,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  github: {
    strategy: require("passport-github2").Strategy,
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ["user:email"],
    customLogic: async (accessToken, profile) => {
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
      profile.emails = [{ value: primaryEmail }];
    },
  },
  // Add more providers as needed
};
