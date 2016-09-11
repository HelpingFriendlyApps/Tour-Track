var express = require('express');
var db  = require('../db');
var Tracks = require('../models/Tracks');

var router = module.exports = express.Router();


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

router.get('/:songId/debut', function(req, res, next) {
  Tracks.getSongDebut(req.params.songId).then( (song) => {
    res.send(song);
  });
});

router.get('/:songId/lastPlayed', function(req, res, next) {
  Tracks.getLastTimePlayed(req.params.songId).then(song => {
    res.send(song);
  });
});

router.get('/:songId/prevPlayed/:date', function(req, res, next) {
  var timeRange = [req.params.date, new Date()];
  Tracks.getPrevTimePlayed(req.params.songId, timeRange).then( (x) => {
    res.send(x);
  });
});