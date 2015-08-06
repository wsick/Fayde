var fs = require('fs'),
    typings = require('bower-typings'),
    allTypings = typings(),
    name = 'fayde',
    meta = {
        name: name,
        ports: {
            testsite: 7001,
            stress: 7002
        },
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
                name: 'test'
            },
            {
                name: 'testsite',
                ignore: "lib/qunit"
            },
            {
                name: 'stress',
                ignore: "lib/qunit"
            }
        ]
    };

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });