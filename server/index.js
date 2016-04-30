var express = require('express');
var Path = require('path');
var routes = express.Router();
var db = require('./db');
var sass = require('node-sass-endpoint');
var session = require('cookie-session');
require('./Seeds/seedRun')

//
//route to your index.html
//
var assetFolder = Path.resolve(__dirname, '../client');
routes.use(express.static(assetFolder));

//
// Example endpoint (also tested in test/server/index_test.js)
//

routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'angular'])
});

if(process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  //
  // We're in development or production mode;
  // create and run a real server.
  //
  var app = express();

  // Parse incoming request bodies as JSON
  app.use( require('body-parser').json() );

  // This compiles your Sass files
  // Remember to change file paths or directories
  app.get(
    '/main.css',
    sass.serve('./client/sass/main.scss', {

      // (dev only) defaults to parent folder of scss file.
      // Any sass file changes in this directory will clear the output cache.
      watchDir: './client/sass/',

      // defaults to parent folder of scss file
      includePaths: ['./client/sass/'],

      // defaults to false
      debug: false
    })
  )

  // Mount our main router
  app.use('/', routes);

  // Start the server!
  var port = process.env.PORT || 4000;
  var host = process.env.HOST || 'http://localhost:' + port;
  app.listen(port);

  app.use(session({
    name: 'Tour-Track:session',
    secret: process.env.SESSION_SECRET || 'development',
    secure: (!! process.env.SESSION_SECRET),
    signed: true
  }))

  //pass the server to Passport
  require('./Auth').mount(app, host);
  routes.use('/creds', require('./API/Creds-api.js'))
  routes.use('/users', require('./API/Users-api.js'));
  routes.use('/shows', require('./API/Shows-api.js'));
  routes.use('/songs', require('./API/Songs-api.js'));
  routes.use('/tours', require('./API/Tours-api.js'));
  routes.use('/venues', require('./API/Venues-api.js'));
  routes.use('/friends', require('./API/Friends-api.js'));
  routes.use('/tracks', require('./API/Tracks-api.js'));

  // routes.get('/*', function(req, res){
  //   res.sendFile( assetFolder + '/index.html' )
  // })

  console.log("Listening on port", port);
} else {
  // We're in test mode; make this file importable instead.
  module.exports = routes;
}
