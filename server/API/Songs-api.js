var express = require('express');
var db  = require('../db');
var Songs = require('../models/Songs');
var ph = require('../models/Phish').Phishin();

var router = module.exports = express.Router();


// Get all songs
router.get('/', function (req, res, next) {
    Songs.getAllSongs().then(function(x) {
    	// console.log("from songs api: x: ", x)
        res.send(x)
    });
});