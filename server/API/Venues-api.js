var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Venues = require('../models/Venues');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


router.get('/', function(req, res, next) {
	Venues.getAllVenues().then(function(x) {
		res.send(x);
	});
});

router.get('/:venueId', function(req, res, next) {
  Venues.getVenueById(req.params.venueId).then(function(x) {
    res.send(x);
  });
});