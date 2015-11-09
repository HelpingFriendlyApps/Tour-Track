var Promise = require('bluebird');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./API/Users-api')

exports.mount = function (app, host) {
passport.use(new FacebookStrategy({
    clientID: "780383652067079",
    clientSecret: "5a46ca22db78f89df6d3e6e431611b49",
    callbackURL: host + "/auth/facebook/callback",
    enableProof: false
  },

  function(accessToken, refreshToken, profile, done) {
    
    importUser(profile).then(done.papp(null))
  }
))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });


app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function importUser (user) {
  return User.updateOrCreate({
    uid: user.id,
    name: user.displayName,
    email: null,
    avatar_url: null
  })
}

}
