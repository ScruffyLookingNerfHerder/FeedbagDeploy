const express = require('express');
const path = require("path");
const passport = require('passport');
const router = express.Router();

let baseUrl = '';

// This is a hack to get around the fact that our backend server
// that social media sites need to call back to is on a different
// port than our front end when we're running in development mode
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3000';
}

// we need to define the routes necessary to make passport-spotify work
// here's the URL users need to visit to initiate the spotify login
router.get('/auth/spotify', passport.authenticate('spotify'), (req, res) => {
  res.end();
});
// here's the URL spotify will call back to finish logging them into your site
router.get('/auth/spotify/callback', passport.authenticate('spotify', {
  failureRedirect: `${baseUrl}/auth/failed`, // tell it where to go if they couldn't log in
  successRedirect: `${baseUrl}/testspotify`, // tell it where to go if the log in successfully
}));

// we need to define the routes necessary to make passport-twitter work
// here's the URL users need to visit to initiate the twitter login
// the res.end() function is a hack to fix a problem where the express static
// middleware tries to serve the files out of client/build
router.get('/auth/twitter', passport.authenticate('twitter'), (req, res) => {
  res.end();
});
// here's the URL twitter will call back to finish logging them into your site
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: `${baseUrl}/auth/failed`, // tell it where to go if they couldn't log in
  successRedirect: `${baseUrl}/testtwitter`, // tell it where to go if the log in successfully
}));

//alex code for fb
//****************************************
router.get('/auth/facebook', passport.authenticate('facebook'), (req, res) =>{
  res.end();
});
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: `${baseUrl}/auth/failed`,
  successRedirect: `${baseUrl}/testtwitter`

}));
//***************************************
//
// Serve up static assets (usually on heroku)
router.use(express.static("client/build", {
  index: false
}));

// Send every request to the React app
// Define any API or static HTML routes before this runs!
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;
