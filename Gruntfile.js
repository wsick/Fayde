var version = require('./build/version'),
    setup = require('./build/setup');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-nuget');

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            testsite: ['./testsite/lib'],
            test: ['./test/lib']
        },
        setup: {
            minerva: {
                cwd: '.'
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    { src: './lib/fayde.controls', dest: './test/lib/fayde.controls' },
                    { src: './lib/minerva', dest: './test/lib/minerva' },
                    { src: './lib/qunit', dest: './test/lib/qunit' },
                    { src: './lib/requirejs', dest: './test/lib/requirejs' },
                    { src: './lib/requirejs-text', dest: './test/lib/requirejs-text' },
                    { src: './themes', dest: './testsite/lib/fayde/themes' },
                    { src: './fayde.js', dest: './testsite/lib/fayde/fayde.js' },
                    { src: './fayde.d.ts', dest: './testsite/lib/fayde/fayde.d.ts' }
                ]
            },
            testsite: {
                files: [
                    { src: './lib/fayde.controls', dest: './testsite/lib/fayde.controls' },
                    { src: './lib/minerva', dest: './testsite/lib/minerva' },
                    { src: './lib/qunit', dest: './testsite/lib/qunit' },
                    { src: './lib/requirejs', dest: './testsite/lib/requirejs' },
                    { src: './lib/requirejs-text', dest: './testsite/lib/requirejs-text' },
                    { src: './themes', dest: './testsite/lib/fayde/themes' },
                    { src: './fayde.js', dest: './testsite/lib/fayde/fayde.js' },
                    { src: './fayde.d.ts', dest: './testsite/lib/fayde/fayde.d.ts' }
                ]
            },
            localminerva: {
                files: [
                    { src: '../minerva', dest: './lib/minerva' }
                ]
            }
        },
        typescript: {
            build: {
                src: ['lib/minerva/minerva.d.ts', 'src/_Version.ts', 'src/**/*.ts'],
                dest: 'Fayde.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: ['test/**/*.ts', './lib/minerva/minerva.d.ts', './fayde.d.ts'],
                options: {
                    target: 'es5',
                    module: 'amd',
                    sourceMap: true
                }
            },
            testsite: {
                src: ['testsite/**/*.ts', '!testsite/lib/**/*.ts', './lib/minerva/minerva.d.ts', './fayde.d.ts'],
                options: {
                    target: 'es5',
                    module: 'amd'
                }
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
                files: ['./src/**/*.ts'],
                tasks: ['typescript:build']
            },
            testsitets: {
                files: ['./testsite/**/*.ts', '!./testsite/lib/**/*.ts'],
                tasks: ['typescript:testsite']
            },
            testsitejs: {
                files: ['/testsite/**/*.js'],
                options: {
                    livereload: 35729
                }
            },
            testsitefay: {
                files: ['./testsite/**/*.fap', './testsite/**/*.fayde'],
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
    grunt.registerTask('test', ['version:apply', 'typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['version:apply', 'typescript:build', 'typescript:testsite', 'connect', 'open', 'watch']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('package', ['nugetpack:dist']);
    grunt.registerTask('publish', ['nugetpack:dist', 'nugetpush:dist']);
    grunt.registerTask('minerva:debug', ['symlink:localminerva']);
    grunt.registerTask('minerva:reset', ['clean:bower', 'setup']);
    grunt.registerTask('lib:link', ['clean:test', 'symlink:test', 'clean:testsite', 'symlink:testsite'])
};
