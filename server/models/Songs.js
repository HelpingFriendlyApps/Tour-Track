var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users');
var ph = require('./Phish').Phishin();

var Songs = module.exports = {

    getAllSongs: function() {
        return db('songs').select('*')
        .orderBy('title', 'asc');
    },

    getSongById: function(songId) {
        return db('songs').first('*')
        .where('songs.id', songId);
    },

    breakMultiSongintoSongObject : function(songString){
        var tempObj = {};
        var multiSongArr = songString.split('>');

        multiSongArr.forEach((song) => {
            tempObj[song.trim()] ? null : tempObj[song.trim()] = 1;
        })
        return tempObj;
    },

    getSongDebut: function(songId) {
        return db('songplayed').first('songplayed.*', 'shows.date', 'shows.venue_id', 'shows.tour_id', 'shows.show_number', 'songs.title', 'venues.name as venue_name', 'venues.latitude', 'venues.longitude', 'venues.location', 'tours.name as tour_name', 'tours.starts_on as tour_starts_on', 'tours.ends_on as tour_ends_on')
        .where('songplayed.song_id', songId)
        .orderBy('date', 'asc')
        .join('shows', 'shows.id', 'songplayed.show_id')
        .join('songs', 'songs.id', 'songplayed.song_id')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id');
    },

    getNeighboringSongByName: function(name, dir) {
        const greaterLess = dir === "next" ? ">" : "<";
        const orderDirection = dir === "next" ? "ASC" : "DESC";
        
        return db.raw("SELECT * FROM songs WHERE title " + greaterLess + " '" + name  + "' ORDER BY title " + orderDirection + " LIMIT 1");
    },

    updateOrCreate : function(attrs){
        return Songs.update(attrs).catch(Songs.create(attrs));
    },

    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('songs').update(attrs).where({ id: attrs.id })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    create : function(attrs){
        attrs.created_at = new Date();
        return db('songs').insert(attrs).return(attrs);
    }
}