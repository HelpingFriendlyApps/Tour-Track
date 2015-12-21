var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Shows = require('../models/Shows');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();



router.get('/', function (req, res, next) {
    Shows.getAllShows().then(function(x) {
        res.send(x);
    })
})

router.get('/venues', function (req, res, next) {
	Shows.getAllShowsWithVenueInfo().then(function(x) {
		console.log('x', x)
		res.send(x);
	})
})

router.get('/venues/:year', function (req, res, next) {
	Shows.getAllShowsWithVenueInfoById().then(function(x) {
		console.log('x', x)
		res.send(x);
	})
})

router.get('/venuesTours', function (req, res, next) {
    Shows.getAllShowsWithVenueTourInfo().then(function(x) {
        res.send(x);
    })
})