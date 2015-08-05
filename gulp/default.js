var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (meta) {
    gulp.task('default', function () {
        return gulp.src(meta.files.src)
            .pipe(sourcemaps.init())
            .pipe(ts({
                target: 'ES5',
                out: meta.name + '.js',
                removeComments: true
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist'));
    });
};