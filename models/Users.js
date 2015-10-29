var express = require('express');
var router = express.Router();
var db  = require('../server/db');


router.get('/', function (req, res, next) {
	db('users').select('*')
	.then(function (data) {
		console.log("All users in user table: ", data)
		res.send(data);
	})
	.then(null, next);
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

module.exports = router;