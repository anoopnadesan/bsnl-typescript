var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json', { typescript: require('typescript') });

var config = require('./config.js');

gulp.task('js', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('ihtml', function () {
    return gulp.src(config.app_files.ihtml)
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(config.app_files.html)
        .pipe(gulp.dest('dist/html'));
});

gulp.task('clean', function (done) {
    del(['dist'], done);
});

gulp.task('css', function () {
    return gulp.src(config.app_files.css)
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('vcss', function () {
    return gulp.src(config.vendor_files.css)
        .pipe(gulp.dest('dist/vendor/css'));
});

gulp.task('libs', function () {
    return gulp.src(config.vendor_files.js)
        .pipe(gulp.dest('dist/vendor/js'));
});

gulp.task('default', ['js', 'css', 'vcss', 'libs', 'ihtml', 'html']);