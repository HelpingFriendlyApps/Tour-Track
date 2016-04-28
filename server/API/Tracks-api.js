var express = require('express');
var db  = require('../db');
var Tracks = require('../models/Tracks');

var router = module.exports = express.Router();


// Get all Tracks
router.get('/', function (req, res, next) {
    Tracks.getAllTracks().then(function(x) {
        res.send(x);
    });
});

router.get('/:songId', function(req, res, next) {
  Tracks.getTracksBySongId(req.params.songId).then(function(x) {
    res.send(x);
  });
});
