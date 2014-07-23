module.exports = function (grunt) {
    grunt.registerMultiTask('setup', 'Sets up build dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', {cwd: this.data.cwd}, function (err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });
};