var express = require('express');
var router = express.Router();
var db  = require('../server/db');


router.get('/', function (req, res, next) {
	db('users').select('*')
	.then(function (res) {
		res.json(res);
	});
});

module.exports = router;