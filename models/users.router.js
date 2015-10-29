var express = require('express');
var router = express.Router();
var db  = require('../server/db');


router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	console.log("made it in")
	// db('users').select('*')
	db('users').select('*').where({uid: id})
	.then(function (res) {
		console.log("res", res)
		console.log("res data", res.data)
		res.json(res);
	})
	.then(null, next);
});

module.exports = router;