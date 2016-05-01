var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();

var Tours = module.exports = {

    getAllTours: function () {
        return db('tours').select('*')
        .orderBy('starts_on', 'asc');
    },

    getTourById: function (id) {
        return db('tours').first('*')
        .where({id: id});
    },

    updateOrCreate : function(attrs){
        return Tours.update(attrs).catch(Tours.create(attrs));
    },

    update: function (attrs) {
        attrs.updated_at = new Date();
        return db('tours').update(attrs).where({ id: attrs.id })
          .then(function(affectedCount) {
            return (affectedCount === 0) ? Promise.reject(new Error('not_found')) : attrs;
          });
    },

    create : function(attrs){
        attrs.created_at = new Date();
        return db('tours').insert(attrs).return(attrs);
    },

    getAllToursWithShows: function() {
        var promiseArr = [];
        return Tours.getAllTours().then( (tours) => {
            tours.forEach( (tour) => {
                promiseArr.push(db('shows').select('*').where({tour_id: tour.id}).then( (showList) => {
                    tour.shows = showList;
                    return tour;
                }))
            });
            return Promise.all(promiseArr);
        });
    }
}