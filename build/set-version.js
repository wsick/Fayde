var Version = require('./utils/Version');

module.exports = function (grunt) {
    grunt.registerTask('version:set', 'Sets package version', function (arg1) {
        try {
            var pkg = grunt.file.readJSON('./package.json');
            pkg.version = new Version(arg1).toString();
            grunt.file.write('./package.json', JSON.stringify(pkg, undefined, 2));
        } catch (err) {
            grunt.log.writeln('Error setting version.', err);
        }
        grunt.task.run('version:apply');
    });
};