const express = require('express'),
    knex = require('../../../db/connection'),
    passport = require('../../../config/passportConfig');

router = express.Router();

function validatePassword(req, res, next) {
    if(req.body.password === req.body.confirmPassword) {
       console.log('passwords compare');
       next();
    } else {
        res.send('passwords doesnt compare');
    }
}

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    res.locals.user = req.session.passport.user;
    res.send({redirect: '/'});
});

router.post('/register', validatePassword, function (req, res, next) {
        const user = {
            name: req.body.firstName + ' ' + req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            organization: req.body.organization,
            gender: req.body.gender,
            phone: req.body.phone,
            country: req.body.country,
            city: req.body.city
        };
        knex('users').insert(user)
            .then(response => {
                console.log(response);
                res.send(response)
            }, err => {
                console.log(err);
                res.send(err);
            });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.send({redirect: '/'});
});

module.exports = router;
