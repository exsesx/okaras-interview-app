var express = require('express');
var router = express.Router();

/* GET home page. */
function ensureAuthenticated(req, res, next) {
    if (req.session.passport && req.session.passport.user) {
        next();
    } else {
        res.redirect('login');
    }
}

function alreadyAuthenticated(req, res, next) {
    if (req.session.passport && req.session.passport.user) {
        res.send('Already authenticated');
    } else {
        next();
    }
}

router.get('/', ensureAuthenticated, function (req, res, next) {
    console.log(req, res);
    res.render('mainPage', {title: 'Home page'});
});

router.get('/login', alreadyAuthenticated, function (req, res, next) {
    res.render('auth/login', {noHeader: true});
});

router.get('/register', function (req, res, next) {
    res.render('auth/register');
});

module.exports = router;
