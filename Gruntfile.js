var bump_version = require('./build/bump-version'),
    set_version = require('./build/set-version'),
    apply_version = require('./build/apply-version');

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
                src: ['build/FaydeVersion.ts', 'Source/Fayde.Client/**/*.ts'],
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
        },
        "version:apply": {
            src: './build/_VersionTemplate._ts',
            dest: './Source/Fayde.Client/_Version.ts'
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

    grunt.registerTask('default', ['version:apply', 'typescript:build']);
    grunt.registerTask('test', ['install:test', 'version:apply', 'typescript:build', 'copy:pretest', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['install:testsite', 'version:apply', 'typescript:build', 'copy:pretestsite', 'typescript:testsite']);

    bump_version(grunt);
    set_version(grunt);
    apply_version(grunt);

    grunt.registerTask('package', ['shell:package']);
    grunt.registerTask('publish', ['shell:package', 'shell:publish']);

};
