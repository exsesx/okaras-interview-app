const express = require('express'),
    passport = require('../../../config/passportConfig');

router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.locals.user = req.session.passport.user;
    res.send({redirect: '/'});
});

router.post('/register', function (req, res, next) {
    res.send('qwerty');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.send({redirect: '/'});
});

module.exports = router;
