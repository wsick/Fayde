var fs = require('fs'),
    typings = require('bower-typings'),
    allTypings = typings(),
    name = 'fayde',
    meta = {
        name: name,
        src: [
            'typings/*.d.ts',
            'src/_Version.ts',
            'src/perf/**/*.ts',
            'src/polyfill/**/*.ts',
            'src/_Types.ts',
            'src/**/*.ts'
        ].concat(typings({includeSelf: false})),
        scaffolds: [
            {
                name: 'test',
                symdirs: ['dist', 'src', 'themes'],
                src: [
                    'typings/*.d.ts',
                    'test/**/*.ts',
                    '!test/lib/**/*.ts',
                    'dist/' + name + '.d.ts'
                ].concat(allTypings)
            },
            {
                name: 'testsite',
                ignore: 'lib/qunit',
                port: 7001,
                symdirs: ['dist', 'src', 'themes'],
                src: [
                    'typings/*.d.ts',
                    'testsite/**/*.ts',
                    '!testsite/lib/**/*.ts',
                    'dist/' + name + '.d.ts'
                ].concat(allTypings)
            },
            {
                name: 'stress',
                ignore: 'lib/qunit',
                port: 7002,
                symdirs: ['dist', 'src', 'themes'],
                src: [
                    'typings/*.d.ts',
                    'stress/**/*.ts',
                    '!stress/lib/**/*.ts',
                    'dist/' + name + '.d.ts'
                ].concat(allTypings)
            }
        ]
    };

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });