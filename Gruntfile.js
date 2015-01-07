var version = require('./build/version'),
    setup = require('./build/setup'),
    path = require('path'),
    connect_livereload = require('connect-livereload'),
    gunify = require('grunt-fayde-unify');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    var unify = gunify(grunt);

    var meta = {
        name: 'Fayde'
    };
    var ports = {
        testsite: 7001,
        stress: 7002,
        livereload: 34343
    };
    var dirs = {
        test: {
            root: 'test',
            build: 'test/.build',
            lib: 'test/lib'
        },
        testsite: {
            root: 'testsite',
            build: 'testsite/.build',
            lib: 'testsite/lib'
        },
        stress: {
            root: 'stress',
            build: 'stress/.build',
            lib: 'stress/lib'
        }
    };

    function mount(connect, dir) {
        return connect.static(path.resolve(dir));
    }

    grunt.initConfig({
        ports: ports,
        meta: meta,
        dirs: dirs,
        pkg: grunt.file.readJSON('./package.json'),
        clean: {
            bower: ['./lib'],
            test: [dirs.test.lib],
            testsite: [dirs.testsite.lib],
            stress: [dirs.stress.lib]
        },
        setup: {
            fayde: {
                cwd: '.'
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            test: {
                files: [
                    {
                        expand: true,
                        src: ['themes/', 'dist/', 'src/'],
                        dest: '<%= dirs.test.lib %>/fayde'
                    },
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: ['*'],
                        dest: dirs.test.lib,
                        filter: 'isDirectory'
                    }
                ]
            },
            testsite: {
                files: [
                    {
                        expand: true,
                        src: ['themes/', 'dist/', 'src/'],
                        dest: '<%= dirs.testsite.lib %>/fayde'
                    },
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: ['*', '!qunit'],
                        dest: dirs.testsite.lib,
                        filter: 'isDirectory'
                    }
                ]
            },
            stress: {
                files: [
                    {
                        expand: true,
                        src: ['themes/', 'dist/', 'src/'],
                        dest: '<%= dirs.stress.lib %>/fayde'
                    },
                    {
                        expand: true,
                        cwd: 'lib/',
                        src: ['*', '!qunit'],
                        dest: dirs.stress.lib,
                        filter: 'isDirectory'
                    }
                ]
            },
            localnullstone: {
                files: [
                    {src: '../nullstone', dest: './lib/nullstone'}
                ]
            },
            localminerva: {
                files: [
                    {src: '../minerva', dest: './lib/minerva'}
                ]
            }
        },
        typescript: {
            build: {
                src: [
                    'typings/*.d.ts',
                    'src/_Version.ts',
                    'src/polyfill/**/*.ts',
                    'src/_Types.ts',
                    'src/**/*.ts'
                ].concat(unify.typings({includeSelf: false})),
                dest: 'dist/Fayde.js',
                options: {
                    target: 'es5',
                    declaration: true,
                    sourceMap: true
                }
            },
            test: {
                src: [
                    'typings/*.d.ts',
                    '<%= dirs.test.root %>/**/*.ts',
                    '!<%= dirs.test.root %>/lib/**/*.ts'
                ].concat(unify.typings()),
                dest: dirs.test.build,
                options: {
                    target: 'es5',
                    basePath: dirs.test.root,
                    module: 'amd',
                    sourceMap: true
                }
            },
            testsite: {
                src: [
                    'typings/*.d.ts',
                    '<%= dirs.testsite.root %>/**/*.ts',
                    '!<%= dirs.testsite.root %>/lib/**/*.ts'
                ].concat(unify.typings()),
                dest: dirs.testsite.build,
                options: {
                    basePath: dirs.testsite.root,
                    target: 'es5',
                    module: 'amd'
                }
            },
            stress: {
                src: [
                    'typings/*.d.ts',
                    '<%= dirs.stress.root %>/**/*.ts',
                    '!<%= dirs.stress.lib %>/**/*.ts'
                ].concat(unify.typings()),
                dest: '<%= dirs.stress.build %>',
                options: {
                    target: 'es5',
                    basePath: '<%= dirs.stress.root %>',
                    module: 'amd',
                    sourceMap: true
                }
            }
        },
        qunit: {
            all: ['<%= dirs.test.root %>/*.html']
        },
        connect: {
            testsite: {
                options: {
                    port: ports.testsite,
                    base: dirs.testsite.root,
                    middleware: function (connect) {
                        return [
                            connect_livereload({port: ports.livereload}),
                            mount(connect, dirs.testsite.build),
                            mount(connect, dirs.testsite.root)
                        ];
                    }
                }
            },
            stress: {
                options: {
                    port: ports.stress,
                    base: dirs.stress.root,
                    middleware: function (connect) {
                        return [
                            connect_livereload({port: ports.livereload}),
                            mount(connect, dirs.stress.build),
                            mount(connect, dirs.stress.root)
                        ];
                    }
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.ts'],
                tasks: ['typescript:build']
            },
            testsitets: {
                files: ['testsite/**/*.ts', '!testsite/lib/**/*.ts'],
                tasks: ['typescript:testsite']
            },
            testsitejs: {
                files: ['testsite/**/*.js', '!testsite/lib/**/*.js'],
                options: {
                    livereload: ports.livereload
                }
            },
            testsitefay: {
                files: ['testsite/**/*.fap', 'testsite/**/*.fayde'],
                options: {
                    livereload: ports.livereload
                }
            },
            stressts: {
                files: ['stress/**/*.ts', '!stress/lib/**/*.ts'],
                tasks: ['typescript:stress']
            },
            stressjs: {
                files: ['stress/**/*.js', '!stress/lib/**/*.js'],
                options: {
                    liverelaod: ports.livereload
                }
            }
        },
        open: {
            testsite: {
                path: 'http://localhost:<%= ports.testsite %>/index.html'
            },
            stress: {
                path: 'http://localhost:<%= ports.stress %>/index.html'
            }
        },
        version: {
            bump: {},
            apply: {
                src: './build/_VersionTemplate._ts',
                dest: './src/_Version.ts'
            }
        }
    });

    grunt.registerTask('default', ['typescript:build']);
    grunt.registerTask('test', ['typescript:build', 'typescript:test', 'qunit']);
    grunt.registerTask('testsite', ['typescript:build', 'typescript:testsite', 'connect:testsite', 'open:testsite', 'watch']);
    grunt.registerTask('stress', ['typescript:build', 'typescript:stress', 'connect:stress', 'open:stress', 'watch']);
    setup(grunt);
    version(grunt);
    grunt.registerTask('lib:reset', ['clean', 'setup', 'symlink:test', 'symlink:testsite', 'symlink:stress']);
    grunt.registerTask('link:nullstone', ['symlink:localnullstone']);
    grunt.registerTask('link:minerva', ['symlink:localminerva']);
    grunt.registerTask('dist:upbuild', ['version:bump', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upminor', ['version:bump:minor', 'version:apply', 'typescript:build']);
    grunt.registerTask('dist:upmajor', ['version:bump:major', 'version:apply', 'typescript:build']);

};