var gulp = require('gulp'),
    del = require('del'),
    symlink = require('gulp-symlink'),
    runSequence = require('run-sequence').use(gulp),
    bower = require('gulp-bower'),
    path = require('path'),
    glob = require('glob');

module.exports = function (meta) {
    gulp.task('clean', function (cb) {
        var dirs = ['./lib'].concat(meta.scaffolds.map(function (sc) {
            return './' + sc.name + '/lib';
        }));
        del(dirs, cb);
    });

    gulp.task('update-libs', function () {
        return bower()
            .pipe(gulp.dest('lib'));
    });

    function createSymlinkTask(name, ignore) {
        gulp.task('symlink-' + name, function () {
            var srcs = glob.sync("lib/*", !ignore ? undefined : {ignore: ignore});
            var dests = srcs.map(function (src) {
                return path.join(name, 'lib', path.basename(src));
            });
            srcs.push('./dist');
            dests.push(path.join(name, 'lib', meta.name, 'dist'));

            srcs.push('./src');
            dests.push(path.join(name, 'lib', meta.name, 'src'));

            return gulp.src(srcs).pipe(symlink.relative(dests, {force: true}));
        });
    }

    meta.scaffolds.forEach(function (scaffold) {
        createSymlinkTask(scaffold.name, scaffold.ignore);
    });
    gulp.task('reset', function () {
        return runSequence('clean', 'update-libs', meta.scaffolds.map(function (scaffold) {
            return 'symlink-' + scaffold.name;
        }));
    });
};