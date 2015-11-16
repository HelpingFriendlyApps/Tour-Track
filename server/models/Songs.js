var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users');
var ph = require('./Phish').Phishin();



var Songs = module.exports = {

    getAllSongs : function(){
        return db('songplayed').select('songplayed.*','shows.*','shows.id as show_id','songs.*','songs.id as song_id', 'venues.*', 'venues.id as venue_id','venues.name as venue_name','tours.*','tours.id as tour_id')
        .join('shows', 'shows.id', 'songplayed.show_id')
        .join('songs', 'songs.id', 'songplayed.song_id')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id')
    },

    breakMultiSongintoSongObject : function(songString){
        var tempObj = {};
        var multiSongArr = songString.split('>');

        multiSongArr.forEach((song) => {
            tempObj[song.trim()] ? null : tempObj[song.trim()] = 1;
        })
        return tempObj;
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