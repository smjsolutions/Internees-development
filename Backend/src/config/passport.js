const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

/* =======================
   GOOGLE STRATEGY
======================= */
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
          }

          if (user) {
            user.googleId = profile.id;
            user.isVerified = true;
            await user.save({ validateBeforeSave: false });
            return done(null, user);
          }

          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos?.[0]?.value,
            isVerified: true,
            role: "customer",
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
} else {
  console.warn("⚠ Google OAuth disabled (missing env vars)");
}

/* =======================
   FACEBOOK STRATEGY
======================= */
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["id", "emails", "name", "picture.type(large)"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ facebookId: profile.id });

          if (!user && profile.emails?.length) {
            user = await User.findOne({ email: profile.emails[0].value });
          }

          if (user) {
            user.facebookId = profile.id;
            user.isVerified = true;
            await user.save({ validateBeforeSave: false });
            return done(null, user);
          }

          user = await User.create({
            facebookId: profile.id,
            email: profile.emails?.[0]?.value,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            avatar: profile.photos?.[0]?.value,
            isVerified: true,
            role: "customer",
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
} else {
  console.warn("⚠ Facebook OAuth disabled (missing env vars)");
}

module.exports = passport;
