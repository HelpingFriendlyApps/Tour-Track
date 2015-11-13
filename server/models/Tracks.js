var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();



var Tracks = module.exports = {

    updateOrCreate : function(attrs){
        return Tracks.update(attrs).catch(Tracks.create(attrs));
    },

    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('songplayed').update(attrs).where({ id: attrs.id })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    create : function(attrs){
        attrs.created_at = new Date();
        return db('songplayed').insert(attrs).return(attrs);
    }
}