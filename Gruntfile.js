var Version = require('./build/version');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        nuget: grunt.file.readJSON('./nuget.json'),
        pkg: grunt.file.readJSON('./package.json'),
        typescript: {
            build: {
                src: ['Source/Fayde.Client/**/*.ts'],
                dest: 'Fayde.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: ['test/**/*.ts'],
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true
                }
            },
            testsite: {
                src: ['testsite/**/*.ts'],
                options: {
                    target: 'es5',
                    module: 'amd'
                }
            }
        },
        copy: {
            pretest: {
                files: [
                    { expand: true, flatten: true, src: ['Themes/*'], dest: 'test/lib/Fayde/Themes', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['Fayde.js'], dest: 'test/lib/Fayde', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['Fayde.d.ts'], dest: 'test/lib/Fayde', filter: 'isFile' }
                ]
            },
            pretestsite: {
                files: [
                    { expand: true, flatten: true, src: ['Themes/*'], dest: 'testsite/lib/Fayde/Themes', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['Fayde.js'], dest: 'testsite/lib/Fayde', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['Fayde.d.ts'], dest: 'testsite/lib/Fayde', filter: 'isFile' }
                ]
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        watch: {
            files: 'src/**/*.ts',
            tasks: ['typescript:build']
        },
        shell: {
            package: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'powershell ./package.ps1 <%= pkg.version %>'
            },
            publish: {
                options: {
                    stdout: true,
                    stderr: true
                },
                command: 'nuget push "./nuget/exjs.<%= pkg.version %>.nupkg" <%= nuget.apiKey %>'
            }
        }
    });

    grunt.registerTask('install:test', 'Install test dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', {cwd: './test'}, function (err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('install:testsite', 'Install test site dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();
        exec('bower install', {cwd: './testsite'}, function (err, stdout, stderr) {
            console.log(stdout);
            cb();
        });
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['install:test', 'typescript:build', 'copy:pretest', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['install:testsite', 'typescript:build', 'copy:pretestsite', 'typescript:testsite']);

    grunt.registerTask('bump', 'Bumps package version', function (arg1) {
        try {
            var pkg = grunt.file.readJSON('./package.json');
            var vers = new Version(pkg.version);
            grunt.log.writeln('Current version: ' + vers);
            vers.bump(arg1);
            pkg.version = vers.toString();
            grunt.log.writeln('Updated version: ' + vers);
            grunt.file.write('./package.json', JSON.stringify(pkg, undefined, 2));
        } catch (err) {
            grunt.log.writeln('Error bumping version.', err);
        }
    });
    grunt.registerTask('version', 'Sets package version', function (arg1) {
        try {
            var pkg = grunt.file.readJSON('./package.json');
            pkg.version = new Version(arg1).toString();
            grunt.file.write('./package.json', JSON.stringify(pkg, undefined, 2));
        } catch (err) {
            grunt.log.writeln('Error setting version.', err);
        }
    });

    grunt.registerTask('package', ['shell:package']);
    grunt.registerTask('publish', ['shell:package', 'shell:publish']);
};
