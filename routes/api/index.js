var express = require('express');
var router = express.Router();
var knex = require('knex');

var auth = require('./auth/index');

router.use('/auth', auth);

/* GET users listing. */
router.get('/users', function(req, res, next) {
    res.send('respond with a qwerty');
});

module.exports = router;
