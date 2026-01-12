const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../src/models/User");

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with same email
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.isVerified = true;
          if (!user.avatar && profile.photos?.length) {
            user.avatar = profile.photos[0].value;
          }
          await user.save({ validateBeforeSave: false });
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
          isVerified: true,
          role: "customer",
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "emails", "name", "picture.type(large)"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await User.findOne({ email: profile.emails?.[0]?.value });

        if (user) {
          user.facebookId = profile.id;
          user.isVerified = true;
          if (!user.avatar && profile.photos?.length) {
            user.avatar = profile.photos[0].value;
          }
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
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
