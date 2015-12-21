var express = require('express');
var db  = require('../db');
var Users = require('../models/Users');
var Friends = require('../models/Friends');


var router = module.exports = express.Router();


// Get all Tours
router.get('/', function (req, res, next) {
    Friends.getAllFriends().then( (allFriendsRecords) => {
        res.send(allFriendsRecords);
    })
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;
    Friends.getFriends(id).then( (usersFriends) => {
    res.send(usersFriends);    
    })
});