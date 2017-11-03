var express = require('express'),
    passport = require('../../../config/passportConfig');
router = express.Router();

var handleLog = function () {
    console.log('TESTING MIDDLEWARE');
};
/* GET users listing. */
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log(req.session.passport.user);
    res.send({redirect: '/'});
});

router.post('/register', function (req, res, next) {
    res.send('qwerty');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
