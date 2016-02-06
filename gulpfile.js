var gulp = require('gulp'),
    taskListing = require('gulp-task-listing'),
    fs = require('fs'),
    typings = require('bower-typings'),
    allTypings = typings(),
    name = 'fayde',
    meta = {
        name: name,
        getSrc: () => {
            return [
                'typings/*.d.ts',
                'src/_Version.ts',
                'src/perf/**/*.ts',
                'src/polyfill/**/*.ts',
                'src/_Types.ts',
                'src/**/*.ts'
            ].concat(typings({includeSelf: false}))
        },
        getScaffold: (name) => {
            return meta.scaffolds.filter(function (scaffold) {
                return scaffold.name === name;
            })[0];
        },
        scaffolds: [
            {
                name: 'test',
                symdirs: ['dist', 'src', 'themes'],
                getSrc: () => {
                    return [
                        'typings/*.d.ts',
                        'test/**/*.ts',
                        '!test/lib/**/*.ts',
                        `dist/${name}.d.ts`
                    ].concat(allTypings);
                }
            },
            {
                name: 'testsite',
                ignore: 'lib/qunit',
                port: 7001,
                symdirs: ['dist', 'src', 'themes'],
                getSrc: () => {
                    return [
                        'typings/*.d.ts',
                        'testsite/**/*.ts',
                        '!testsite/lib/**/*.ts',
                        `dist/${name}.d.ts`
                    ].concat(allTypings);
                }
            },
            {
                name: 'stress',
                ignore: 'lib/qunit',
                port: 7002,
                symdirs: ['dist', 'src', 'themes'],
                getSrc: () => {
                    return [
                        'typings/*.d.ts',
                        'stress/**/*.ts',
                        '!stress/lib/**/*.ts',
                        `dist/${name}.d.ts`
                    ].concat(allTypings);
                }
            }
        ]
    };

gulp.task('help', taskListing);

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });