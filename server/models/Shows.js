var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')
var ph = require('./Phish').Phishin();



var Shows = module.exports = {

    getAllShows : function(){
        return ph.getShows(null, ['per_page=50']).then( (data) => {
        })
    }
}