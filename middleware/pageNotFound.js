module.exports = function (req, res, next) {
    res.status(404).render('../views/404.hbs');
};