var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Shows = require('../models/Shows');
var Phish = require('./Phish-api')
var ph = Phish.Phishin();
var router = module.exports = express.Router();

// router.get('/', function (req, res, next) {
//     ph.getYears('1997').then(function (response) {
//     console.log(response);
// });
// })



router.get('/', function (req, res, next) {

    ph.getShows(null, ['per_page=2000']).then(function (response) {
        res.send(response);
    })

})