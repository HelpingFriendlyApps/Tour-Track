var db      = require('../db.js');
var Promise = require('bluebird');
var request = require('request-promise');
var Users   = require('./Users')

var Shows = module.exports = {

    getAllShows : function(){

        

            return request('http://phish.in/api/v1/shows?page=1&per_page=2000')
    }
}