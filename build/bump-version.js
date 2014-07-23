var Version = require('./utils/Version');

module.exports = function (grunt) {
    grunt.registerTask('version:bump', 'Bumps package version', function (arg1) {
        try {
            var pkg = grunt.file.readJSON('./package.json');
            var vers = new Version(pkg.version);
            grunt.log.writeln('Current version: ' + vers);
            vers.bump(arg1);
            pkg.version = vers.toString();
            grunt.log.writeln('Updated version: ' + vers);
            grunt.file.write('./package.json', JSON.stringify(pkg, undefined, 2));
        } catch (err) {
            grunt.fail.fatal('Error bumping version.', err);
        }
        grunt.task.run('version:apply');
    });
};