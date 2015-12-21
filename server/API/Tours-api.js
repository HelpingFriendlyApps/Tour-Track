var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Tours = require('../models/Tours');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


router.get('/', function (req, res, next) {
	Tours.getAllTours().then(function(x) {
		res.send(x);
	});
});

router.get('/:id', function (req, res, next) {
	Tours.getTourById(req.params.id).then(function(x) {
		res.send(x);
	});
});

router.get('/shows', function (req, res, next) {
    Tours.getAllToursWithShows().then(function(x) {
        res.send(x);
    });
});