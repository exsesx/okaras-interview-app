const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('../db/connection');

passport.use(new LocalStrategy((username, password, done) => {
    // check to see if the username exists
    knex('users').where({username: username, password: password}).first()
        .then((user) => {
            if (!user) return done(null, false);
            // if compare passwords here
            else {
                return done(null, user);
            }
        })
        .catch((err) => {
            return done(err);
        });
}));

passport.serializeUser((user, done) => {
    done(null, user.user_id);
    console.log('SERIALIZE');
});

passport.deserializeUser((id, done) => {
    console.log('DESERIALIZE');
    knex('users').where({user_id: id}).first()
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err, null);
        });
});

module.exports = passport;