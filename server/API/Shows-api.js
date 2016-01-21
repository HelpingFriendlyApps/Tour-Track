var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Shows = require('../models/Shows');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


router.get('/', function(req, res, next) {
    Shows.getAllShows().then(function(x) {
        res.send(x);
    });
});

router.get('/:showId', function(req, res, next) {
    Shows.getShowById(req.params.showId).then(function(x) {
        res.send(x);
    });
});

router.get('/venueId/:venueId', function(req, res, next) {
    Shows.getShowsByVenueId(req.params.venueId).then(function(x) {
        res.send(x);
    });
});

router.get('/tourId/:tourId', function(req, res, next) {
    Shows.getShowsByTourId(req.params.tourId).then(function(x) {
        res.send(x);
    });
});

router.get('/setlist/:showId', function(req, res, next) {
    Shows.getSetlist(req.params.showId).then(function(x) {
        res.send(x);
    });
});