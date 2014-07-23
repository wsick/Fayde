module.exports = function (grunt) {
    grunt.registerTask('version:apply', 'Applies package version to Fayde build.', function () {
        grunt.config.requires('version:apply');
        var opts = grunt.config.get(['version:apply']);
        var pkg = grunt.file.readJSON('./package.json');

        var template = grunt.file.read(opts.src);
        var output = template.replace('%VERSION%', pkg.version);
        grunt.file.write(opts.dest, output);
    });
};