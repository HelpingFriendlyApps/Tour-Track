var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Shows = require('../models/Shows');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


router.get('/', function(req, res, next) {
    Shows.getAllShows().then( (x) => {
        res.send(x);
    });
});

function getRandomShow(res) {
    Shows.getRandomShowId().then( (x) => {
        var randomId = Math.floor(Math.random() * x.max) + x.min;
        Shows.getShowById(randomId).then( (x) => {
            if(!x) throw err;
            res.send(x);
        }).catch(function() {
            return getRandomShow(res);
        });
    });
}

router.get('/random', function(req, res, next) {
    getRandomShow(res);
});

router.get('/randomFromToday', function(req, res, next) {
    Shows.getRandomShowOnTodaysDate().then( (x) => {
        if(x === undefined){
            getRandomShow(res);
        } else {
           res.send(x);
        }
    });
});

router.get('/lastShow', function(req, res, next) {
    Shows.getLastShow().then( (x) => {
        res.send(x);
    });
});

router.get('/:showId', function(req, res, next) {
    Shows.getShowById(req.params.showId).then( (x) => {
        res.send(x);
    });
});

router.get('/date/:date', function(req, res, next) {
    var date = req.params.date;
    var timeRange = [date + 'T00:00:00.000Z', date + 'T23:59:59.000Z'];
    Shows.getShowByDate(timeRange).then( (x) => {
        res.send(x);
    });
});

router.get('/date/:date/next', function(req, res, next) {
    var date = req.params.date;
    var timeRange = [date + 'T00:00:00.000Z', '3000-01-01T23:59:59.000Z'];
    Shows.getNextShowByDate(timeRange).then( (x) => {
        res.send(x);
    });
});

router.get('/date/:date/prev', function(req, res, next) {
    var date = req.params.date;
    var timeRange = ['0001-01-01T00:00:00.000Z', date + 'T23:59:59.000Z'];
    Shows.getPrevShowByDate(timeRange).then( (x) => {
        res.send(x);
    });
});

router.get('/year/:year', function(req, res, next) {
    var year = parseInt(req.params.year);
    var string = '-01-01T00:00:00.000Z';
    var timeRange = [year + string, ++year + string];
    Shows.getShowsByYear(timeRange).then( (x) => {
        res.send(x);
    });
});

router.get('/venueId/:venueId', function(req, res, next) {
    Shows.getShowsByVenueId(req.params.venueId).then( (x) => {
        res.send(x);
    });
});

router.get('/tourId/:tourId', function(req, res, next) {
    Shows.getShowsByTourId(req.params.tourId).then( (x) => {
        res.send(x);
    });
});

router.get('/setlist/showId/:showId', function(req, res, next) {
    Shows.getSetlistById(req.params.showId).then( (x) => {
        res.send(x);
    });
});

router.get('/setlist/date/:date', function(req, res, next) {
    var date = req.params.date;
    var timeRange = [date + 'T00:00:00.000Z', date + 'T23:59:59.000Z'];
    Shows.getSetlistByDate(timeRange).then( (x) => {
        res.send(x);
    });
});