var express = require('express');
var db  = require('../db');
var Users = require('../models/Users')

var router = module.exports = express.Router();

router.get('/', function (req, res, next) {
	Users.getUsers().then(function(x){ res.send(x)})
});


router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	db('users').select('*').where({uid: id})
	.then(function (data) {
		console.log("single user with requested ID: ", data)
		res.send(data);
	})
	.then(null, next);
});

