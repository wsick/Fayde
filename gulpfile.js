var fs = require('fs'),
    typings = require('bower-typings'),
    allTypings = typings(),
    name = 'fayde',
    meta = {
        name: name,
        files: {
            src: [
                'typings/*.d.ts',
                'src/_Version.ts',
                'src/perf/**/*.ts',
                'src/polyfill/**/*.ts',
                'src/_Types.ts',
                'src/**/*.ts'
            ].concat(typings({includeSelf: false})),
            test: [
                'typings/*.d.ts',
                'test/**/*.ts',
                '!test/lib/**/*.ts',
                'dist/' + name + '.d.ts'
            ].concat(allTypings),
            stress: [
                'typings/*.d.ts',
                'stress/**/*.ts',
                '!stress/lib/**/*.ts',
                'dist/' + name + '.d.ts'
            ].concat(allTypings)
        },
        scaffolds: [
            {
                name: 'test',
                symdirs: ['dist', 'src', 'themes']
            },
            {
                name: 'testsite',
                ignore: 'lib/qunit',
                port: 7001,
                symdirs: ['dist', 'src', 'themes']
            },
            {
                name: 'stress',
                ignore: 'lib/qunit',
                port: 7002,
                symdirs: ['dist', 'src', 'themes']
            }
        ]
    };

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });