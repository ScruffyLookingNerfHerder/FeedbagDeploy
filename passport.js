const session = require('express-session');
const cookieparser = require('cookie-parser');
const passport = require('passport');
const db = require('./models');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

console.log(process.env.TWITTER_CONSUMER_KEY)

module.exports = (app) => {
  app.use(cookieparser());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitalized: false,
    rolling: true,
    name: 'sid',
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
      // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
      // domain: 'your.domain.com',
      // recommended you use this setting in production if your site is published using HTTPS
      // secure: true,
    }
  }));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });



  passport.deserializeUser(function (userId, done){
    db.User.findById(userId)
      .then(function(user){
        done(null, user);
      })
      .catch(function(err) {
        done(err);
      });
  });

  passport.use(new LocalStrategy((username, password, done) => {
  const errorMsg = 'Invalid username or password';

  db.User.findOne({ username })
    .then(user => {
      // if no matching user was found...
      if (!user) {
        return done(null, false, { message: errorMsg });
      }

      // call our validate method, which will call done with the user if the
      // passwords match, or false if they don't
      return user.validatePassword(password)
        .then(isMatch => done(null, isMatch ? user : false, isMatch ? null : { message: errorMsg }));
    })
    .catch(done);
}));

passport.use(new TwitterStrategy(
    {
      // the consumerKey twitter assigned to your app
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      // the secret twitter assigned to your app
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      // the path twitter will call back to once the user has logged in.
      // We'll define this route in routes/htmlRoutes.js
      callbackURL: `${process.env.APP_BASE_URL}/auth/twitter/callback`
    },
    // i'm using async/await with promises to keep my code readable
    // you can stick with plain old promises if you'd like (whyyyy??)
    async (token, tokenSecret, profile, done) => {
      // we'll need these later
      let user;
      let membership;

      try {
        // first, try to find the user that is connected to this twitter user
        // i'm using findOneAndUpdate so that if the membership already exists,
        // we just update their access token which will periodically expire
        membership = await db.SocialMediaMembership.findOneAndUpdate({
          provider: 'twitter',
          providerUserId: profile.id
        }, {
          token, // you'll typically want to encrypt these before storing db
          tokenSecret
        })
        // need the fully populated user for this membership, this is important!
        .populate('userId');
      } catch (err) {
        // you need to let the strategy know if there was an error!
        return done(err, null);
      }

      if (!membership) {
        try {
          // no user with this twitter account is on file,
          // so create a new user and membership for this twitter user
          user = await db.User.create({
            username: profile.username
          });
          membership = await db.SocialMediaMembership.create({
            provider: 'twitter',
            providerUserId: profile.id,
            token,
            tokenSecret,
            userId: user.id
          });
        } catch (err) {
          return done(err, null);
        }
      } else {
        // get the user from the membership
        user = membership.userId;
      }

      // tell the strategy we found the user
      done(null, user);
    }
  ));

  passport.use(
      new GoogleStrategy({
          //options for google strategy
          callbackURL: '/auth/google/redirect',
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }, (accessToken, refreshToken, profile, done) => {
          //passport callback function
          console.log("passport callback function");
          console.log(typeof profile.id);
          db.User.findOne({
            userid: profile.id
          }).then((currentUser) => {
            if (currentUser) {
              // already have this user
              console.log('user is: ', currentUser);
              done(null, currentUser);
            } else {
              // if not, create user in our db
              new db.User({
                userid: profile.id,
                username: profile.displayName
              }).save().then((newUser) => {
                console.log('created new user: ', newUser);
                done(null, newUser);
              });
            }
          })
        })
      );

      passport.use(
        new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        callbackURL: `${process.env.APP_BASE_URL}/auth/facebook/callback`,
        profileFields: ['id','displayName', 'photos', 'email']
        },
        (accessToken, refreshToken, profile, done) => {
          db.User.findOne({
            googleId: profile.id
          }).then((currentUser) => {
            if (currentUser) {
            console.log('user is ', currentUser);
            done(null, currentUser);
          } else {
            new db.User({
              userid: profile.id,
              username: profile.displayName
            }).save().then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            })
          }
        })
      })
    );


  app.use(passport.initialize());
  app.use(passport.session());
}
