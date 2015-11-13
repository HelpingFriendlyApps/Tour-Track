var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users');
var ph = require('./Phish').Phishin();



var Songs = module.exports = {

    getAllSongs : function(){
        return request('http://phish.in/api/v1/songs?page=1&per_page=2000')
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