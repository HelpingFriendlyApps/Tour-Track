var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();



var Shows = module.exports = {

    getAllShows : function(){
        return db('shows').select('*')
        .orderBy('date', 'asc');
    },

    getAllShowsWithVenueInfo : function() {
        return db('shows').select('shows.*', 'venues.*')
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
    },

    getAllShowsWithVenueInfoByYear : function(year) {
        return db('shows').select('shows.*', 'venues.*')
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
    },

    getAllShowsWithVenueTourInfo : function(){
        return db('shows').select('shows.*', 'venues.*', 'venues.id as venue_id','venues.name as venue_name','tours.*','tours.id as tour_id', 'tours.name as tour_name')
        .orderBy('date', 'asc')
        .join('venues', 'venues.id', 'shows.venue_id')
        .join('tours', 'tours.id', 'shows.tour_id')
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