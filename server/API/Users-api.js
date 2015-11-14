var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');

var router = module.exports = express.Router();

// Get all users
router.get('/', function (req, res, next) {
	Users.getUsers().then(function(x){ res.send(x)})
});

// Create a user
router.post('/', function (req, res, next) {
	Users.createUser().then(function(x){ res.send(x)})
});

// Gets a user's shows
    // Uses the user's id to look up phish_username
    // Takes username and call to the API asking for all shows for that user
router.post('/phishNETaccount/:id', function (req, res, next) {
    var id = req.params.id;
	Users.update(req.body).then(function(x){
		Users.getUserShows(id).then(function(userShows){
        	res.send(userShows);
    	})
	});
})

// Gets all songs from every show
router.get('/shows/songs/:id', function(req, res, next){
    var id = req.params.id;
    Users.getUserShows(id).then(function(userShows){
        Users.getAllSongs(userShows).then(function(x){ 
            res.send(x);
        })
    })
});

// Gets a user's shows
router.get('/shows/:id', function(req, res, next){
    var id = req.params.id;
    Users.getUserShows(id).then(function(userShows){
        res.send(userShows);
    })
});

// Gets a specific user
router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Users.getUser(id).then(function (data) {
        res.send(data);
    })
    .then(null, next);
});