var version = require('./build/version'),
    setup = require('./build/setup');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-nuget');

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        setup: {
            test: {
                cwd: './test'
            },
            testsite: {
                cwd: './testsite'
            }
        },
        typescript: {
            build: {
                src: ['src/_Version.ts', 'src/**/*.ts'],
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
            },
            deploy: {
                files: [
                    { expand: true, flatten: true, src: ['Themes/*'], dest: 'nuget/content/lib/Fayde/Themes', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['Fayde.js'], dest: 'nuget/content/lib/Fayde', filter: 'isFile' },
                    { expand: true, flatten: true, src: ['Fayde.d.ts'], dest: 'nuget/content/lib/Fayde', filter: 'isFile' }
                ]
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        connect: {
            server: {
                options: {
                    port: 8001,
                    base: './testsite/'
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.ts'],
                tasks: ['typescript:build']
            },
            dist: {
                files: ['Fayde.js'],
                tasks: ['copy:pretestsite']
            },
            testsitets: {
                files: ['testsite/**/*.ts'],
                tasks: ['typescript:testsite']
            },
            testsitejs: {
                files: ['testsite/**/*.js'],
                options: {
                    livereload: 35729
                }
            },
            testsitefay: {
                files: ['testsite/**/*.fap', 'testsite/**/*.fayde'],
                options: {
                    livereload: 35729
                }
            }
        },
        open: {
            testsite: {
                path: 'http://localhost:8001/index.html'
            }
        },
        version: {
            bump: {
            },
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        },
        nugetpack: {
            dist: {
                src: './nuget/Fayde.nuspec',
                dest: './nuget/',
                options: {
                    version: '<%= pkg.version %>'
                }
            }
        },
        nugetpush: {
            dist: {
                src: './nuget/Fayde.<%= pkg.version %>.nupkg'
            }
        }
    });

    grunt.registerTask('default', ['version:apply', 'typescript:build']);
    grunt.registerTask('test', ['setup:test', 'version:apply', 'typescript:build', 'copy:pretest', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['setup:testsite', 'version:apply', 'typescript:build', 'copy:pretestsite', 'typescript:testsite', 'connect', 'open', 'watch']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('package', ['copy:desploy', 'nugetpack:dist']);
    grunt.registerTask('publish', ['copy:desploy', 'nugetpack:dist', 'nugetpush:dist']);

};
