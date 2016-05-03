var express = require('express');
var db  = require('../db');
var Songs = require('../models/Songs');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


router.get('/', function(req, res, next) {
  Songs.getAllSongs().then(function(x) {
    res.send(x)
  });
});

router.get('/prev/:name', function(req, res, next){
  var songName = req.params.name;
  getNeighboringShowByname(songName, 'DESC').then( (song) => {
    if(song){
      res.send(song);
    }
  });
});

router.get('/next/:name', function(req, res, next){
  var songName = req.params.name;
  getNeighboringShowByname(songName, 'ASC').then( (song) => {
    if(song){
      res.send(song);
    }
  });
});

router.get('/:songId', function(req, res, next) {
  Songs.getSongById(req.params.songId).then(function(x) {
    res.send(x)
  });

});