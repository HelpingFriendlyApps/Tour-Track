var ph = require('../models/Phish').Phishin();
var Tours = require('../models/Tours');
var Shows = require('../models/Shows');
var Songs = require('../models/Songs');
var Venues = require('../models/Venues');
var Tracks = require('../models/Tracks');
var Promise = require('bluebird');
var db = require('../db');


function seedSongs() {
  ph.getSongs(null, ['per_page=2000']).then(function(x) {
    var data = JSON.parse(x).data;
    return data.map( (song) => {
      var songModel = {
        id: song.id,
        title: song.title,
        created_at: new Date()
      }
      Songs.updateOrCreate(songModel);
    });
  });
}

function seedTours() {
  ph.getTours(null, ['per_page=1000']).then(function(x) {
    var data = JSON.parse(x).data;
    data.map( (tour) => {
      var tourModel = {
        name: tour.name,
        id: tour.id,
        starts_on: tour.starts_on,
        ends_on: tour.ends_on,
        created_at: new Date()
      }
      Tours.updateOrCreate(tourModel);
    });
  });
}

function seedVenues() {
  ph.getVenues(null, ['per_page=3000']).then(function(x) {
    var data = JSON.parse(x).data,
      locationIds = {},
      id = 0;

    data.map( (venue) => {
      var lng = venue.longitude,
        lat = venue.latitude;

      locationIds[lng] = locationIds[lng] || {};
      locationIds[lng][lat] = locationIds[lng][lat] || ++id;

      var venueModel = {
        location: venue.location,
        id: venue.id,
        longitude: venue.longitude,
        latitude:  venue.latitude,
        name: venue.name,
        location_id: locationIds[lng][lat],
        created_at: new Date()
      }
      Venues.updateOrCreate(venueModel);
    });
  });
}

function seedShows() {
  ph.getShows(null, ['per_page=3000']).then(function(x) {
    var data = JSON.parse(x).data;

    data.sort( (a,b) => {
      return new Date(a.date) - new Date(b.date);
    });
    
    data.map( (show, index) => {
      var showModel = {
        // date: show.date,
        date: show.date,
        id: show.id,
        show_number: ++index,
        tour_id: show.tour_id,
        venue_id:  show.venue_id,
        duration: show.duration,
        created_at: new Date()
      }
      Shows.updateOrCreate(showModel);
    });
  });
}

function seedTracks() {
  for(var i = 1000; i > 0; i--) {   
    ph.getSongs(i).then(function(x) {
      var data = JSON.parse(x).data;
      
      data.tracks.map( (song) => {
        var trackModel = {
          id: song.id,
          set: song.set,
          show_id: song.show_id,
          song_id: data.id,
          position:  song.position,
          duration: song.duration,
          mp3: song.mp3,
          created_at: new Date()
        }
        Tracks.updateOrCreate(trackModel);
      });
    });
  }
}

function fillSongsPlayed() {
  db('songplayed').count('id').then(function(total) {
    if(total[0].count !== '29085') {
      seedTracks();
      setTimeout(fillSongsPlayed, 30000);
    }
  });
}


var Seeds = module.exports = {
  seedSongs : seedSongs,
  seedTours : seedTours,
  seedVenues : seedVenues,
  seedShows : seedShows,
  seedTracks : fillSongsPlayed 
}
