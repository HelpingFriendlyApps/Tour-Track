var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');

var router = module.exports = express.Router();

router.get('/', function (req, res, next) {
	Users.getUsers().then(function(x){ res.send(x)})
});

router.post('/', function (req, res, next) {
	Users.createUser().then(function(x){ res.send(x)})
});

router.get('/shows/:id', function(req, res, next){
    var id = req.params.id;
    Users.getUserShows(id).then(function(userShows){
        res.send(userShows);
    })
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Users.getUser(id).then(function (data) {
        console.log("single user with requested ID: ", data)
        res.send(data);
    })
    .then(null, next);
});


