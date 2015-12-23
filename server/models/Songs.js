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

    getSetlist : function(showId){
        return db('shows').select('songs.title')
        .where('shows.id', showId)
        .orderBy('set', 'asc')
        .orderBy('position', 'asc')
        .join('songplayed', 'shows.id', 'songplayed.show_id')
        .join('songs', 'songplayed.song_id','songs.id')
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