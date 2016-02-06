var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

module.exports = function (meta) {
    var scaffold = meta.getScaffold('testsite');
    if (!scaffold)
        return;

    gulp.task('testsite-build', function () {
        return gulp.src(scaffold.getSrc())
            .pipe(sourcemaps.init())
            .pipe(ts({
                module: 'amd',
                target: 'ES5',
                pathFilter: {'testsite': ''}
            }))
            .pipe(sourcemaps.write('./', {sourceRoot: '/', debug: true}))
            .pipe(gulp.dest('testsite/.build'))
            .pipe(connect.reload());
    });

    gulp.task('testsite-reload', function () {
        gulp.src('testsite/*.html')
            .pipe(connect.reload());
    });

    gulp.task('testsite', ['default', 'testsite-build'], function () {
        var options = {
            url: `http://localhost:${scaffold.port}`
        };
        gulp.src('testsite/index.html')
            .pipe(open('', options));

        connect.server({
            livereload: true,
            root: ['testsite', 'testsite/.build'],
            port: scaffold.port
        });

        gulp.watch('testsite/!(lib)/**/*.ts', ['testsite-build']);
        gulp.watch('testsite/.build/**/*', ['testsite-reload']);
        gulp.watch('dist/*.js', ['testsite-reload']);
    });
};