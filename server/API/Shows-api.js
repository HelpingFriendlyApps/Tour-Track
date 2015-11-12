var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Shows = require('../models/Shows');
var ph = require('../models/Phish').Phishin();
var router = module.exports = express.Router();




router.get('/', function (req, res, next) {
    ph.getShows(null, ['per_page=2000']).then(function (response) {
        res.send(response);
    })
})