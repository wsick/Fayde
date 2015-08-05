var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

module.exports = function (meta) {
    gulp.task('stress-build', function () {
        return gulp.src(meta.files.stress)
            .pipe(sourcemaps.init())
            .pipe(ts({
                target: 'ES5',
                module: 'amd',
                outDir: 'stress/.build/',
                pathFilter: {'stress': ''}
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('stress/.build/'))
            .pipe(connect.reload());
    });

    gulp.task('stress', ['default', 'stress-build'], function () {
        var options = {
            url: 'http://localhost:' + meta.ports.stress.toString()
        };
        gulp.src('stress/index.html')
            .pipe(open('', options));

        connect.server({
            livereload: true,
            root: ['stress', 'stress/.build'],
            port: meta.ports.stress
        });

        gulp.watch('stress/**/*.ts', ['stress-build']);
        gulp.watch('stress/.build/**/*', connect.reload);
    });
};