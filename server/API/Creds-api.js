var express = require('express');
var db  = require('../db');

var router = module.exports = express.Router();

router.get('/mapboxToken', function (req, res, next) {
    var token = process.env.mapboxToken || "";
    res.send(token);
});
