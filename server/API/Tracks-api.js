var express = require('express');
var db  = require('../db');
var Tracks = require('../models/Tracks');

var router = module.exports = express.Router();


// Get all Tours
router.get('/', function (req, res, next) {
    Tracks.getAllTracks().then(function(x) {
        console.log('retrieving')
        res.send(x);
    });
});
