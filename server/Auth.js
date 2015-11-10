var Promise = require('bluebird');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/Users')

exports.mount = function (app, host) {
  passport.use(new FacebookStrategy({
      clientID: "780383652067079",
      clientSecret: "5a46ca22db78f89df6d3e6e431611b49",
      callbackURL: host + "/auth/facebook/callback"
    },

    function(accessToken, refreshToken, profile, done) {

      importUser(profile);
      done(null, profile);
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
    passport.authenticate('facebook'));


  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/#/' }),
    function(req, res) {
      res.redirect('/#/about');
    });

  app.get('/me', function(req, res){
    User.getUser(req.user.id).then(function(userObj){res.send(userObj)});
  })


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/#/');
  });

  function importUser (user) {
    return User.updateOrCreate({
      uid: user.id,
      name: user.displayName,
      email: null
    })
  }

}
