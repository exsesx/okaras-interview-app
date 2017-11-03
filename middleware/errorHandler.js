module.exports = function (err, req, res, next) {
    res.status(500).render('../views/error.hbs', {message: 'Internal Server Error (500)',error: err});
};