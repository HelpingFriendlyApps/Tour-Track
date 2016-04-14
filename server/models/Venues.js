var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();



var Venues = module.exports = {

    getAllVenues : function(){
        return db('venues').select('*')
        .orderBy('name', 'asc');
    },

    getVenueById: function(venueId) {
        return db('venues').first('*')
        .where('venues.id', venueId);
    },

    updateOrCreate : function(attrs){
        return Venues.update(attrs).catch(Venues.create(attrs));
    },

    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('venues').update(attrs).where({ id: attrs.id })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    create : function(attrs){
        attrs.created_at = new Date();
        return db('venues').insert(attrs).return(attrs);
    }
}