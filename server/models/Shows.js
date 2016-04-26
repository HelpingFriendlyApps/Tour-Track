var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();


var Shows = module.exports = {

    getAllShows : function(){
        return db('shows').select('shows.*', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location')
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id');
    },

    getShowById: function(showId) {
        return db('shows').first('*')
        .where('shows.id', showId);
    },

    getShowByDate: function(date) {
        return db('shows').first('shows.*', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location', 'tours.name as tour_name', 'tours.starts_on as tour_starts_on', 'tours.ends_on as tour_ends_on')
        .whereBetween('date', date)
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id');
    },


    getNextShowByDate: function(date) {
        return db('shows').first('shows.*', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location', 'tours.name as tour_name', 'tours.starts_on as tour_starts_on', 'tours.ends_on as tour_ends_on')
        .whereBetween('date', date)
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id')
        .offset(1);
    },

    getPrevShowByDate: function(date) {
        return db('shows').first('shows.*', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location', 'tours.name as tour_name', 'tours.starts_on as tour_starts_on', 'tours.ends_on as tour_ends_on')
        .whereBetween('date', date)
        .orderBy('date', 'desc')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id')
        .offset(1);
    },

    getShowsByYear: function(timeRange) {
        return db('shows').select('shows.*', 'tours.name as tour_name', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location')
        .whereBetween('date', timeRange)
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id');
    },

    getShowsByVenueId: function(venueId) {
        return db('shows').select('shows.*', 'tours.name as tour_name', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location')
        .where('venue_id', venueId)
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id');
    },

    getShowsByTourId: function(tourId) {
        return db('shows').select('shows.*', 'tours.name as tour_name', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location')
        .where('tour_id', tourId)
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id');
    },

    getSetlistById: function(showId){
        return db('shows').select('shows.date', 'songplayed.id', 'songplayed.set', 'songplayed.position', 'songplayed.duration', 'songplayed.song_id', 'songplayed.mp3', 'songs.title')
        .where('shows.id', showId)
        .join('songplayed', 'songplayed.show_id', 'shows.id')
        .join('songs', 'songplayed.song_id', 'songs.id')
        .orderBy('set', 'asc')
        .orderBy('position', 'asc');
    },

    getSetlistByDate: function(date) {
      return db('shows').select('shows.date', 'songplayed.id', 'songplayed.set', 'songplayed.position', 'songplayed.duration', 'songplayed.song_id', 'songplayed.mp3', 'songs.title')
      .whereBetween('date', date)
      .join('songplayed', 'songplayed.show_id', 'shows.id')
      .join('songs', 'songplayed.song_id', 'songs.id')
      .orderBy('set', 'asc')
      .orderBy('position', 'asc');
    },

    updateOrCreate : function(attrs){
        return Shows.update(attrs).catch(Shows.create(attrs));
    },

    update : function (attrs) {
        attrs.updated_at = new Date();
        return db('shows').update(attrs).where({ id: attrs.id })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    create : function(attrs){
        attrs.created_at = new Date();
        return db('shows').insert(attrs).return(attrs);
    }
}