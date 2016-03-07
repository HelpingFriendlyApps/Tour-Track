var Promise = require('bluebird');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./models/Users')

exports.mount = function (app, host) {
  
  passport.use(new FacebookStrategy({
      clientID: process.env.facebookClientId,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: host + "/auth/facebook/callback",
      scope: "email",
      profileFields: ['id', 'displayName', 'photos', 'emails','age_range','birthday']
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
      res.redirect('/#/');
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
      email: user.emails[0].value,
      profilePic: user.photos[0].value
    })
  }

}
