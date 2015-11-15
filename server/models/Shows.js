var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();



var Shows = module.exports = {

    getAllShows : function(){
        return db('shows').select('*');
    },

    getAllShowsWithVenueInfo : function(){
        return db('shows').select('*').join('venues', function() {
        this.on('venues.id', '=', 'shows.venue_id')})
    },

    updateOrCreate : function(attrs){
        return Shows.update(attrs).catch(Shows.create(attrs));
    },

    update: function (attrs) {
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