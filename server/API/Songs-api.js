var express = require('express');
var db  = require('../db');
var Songs = require('../models/Songs');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


router.get('/', function (req, res, next) {
    Songs.getAllSongs().then(function(x) {
        res.send(x)
    });
});

router.get('/shows/:showId', function (req, res, next) {
    Songs.getSetlist(req.params.showId).then(function(x) {
        res.send(x)
    });
});