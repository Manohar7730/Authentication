const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const env = require("../config/environment");

passport.use(
  new GoogleStrategy(
    {
      clientID: env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_call_back_url,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // find a user
        const user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          // if found set this user as req.user
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log(`error in google strategy passport ${err}`);
        return done(err);
      }
    }
  )
);
