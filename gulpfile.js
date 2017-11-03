var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css');

var assetsPath = "./public/assets",
    publicPath = "./public";

gulp.task('sass', function () {
    return gulp.src(assetsPath + '/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(assetsPath + '/css'));
});

gulp.task('css', ['sass'], function () {
    return gulp.src(assetsPath + '/css/*.css')
        .pipe(concatCss('build.css'))
        .pipe(cleanCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(publicPath + '/build/css/'));
});

gulp.task('watch', function() {
    gulp.watch([assetsPath + '/css/*.css', assetsPath + '/scss/*.scss'], ['css']);
});

gulp.task('default', ['css', 'watch']);