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