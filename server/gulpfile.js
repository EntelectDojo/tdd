'use strict';
var gulp = require("gulp");
var shell = require("gulp-shell");
var jsonEditor = require("gulp-json-editor");
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var argv = require('yargs').argv;
var eslint = require('gulp-eslint');
var config = require("./build.config.js");

var jsFiles = config.inputFiles.index.concat(config.inputFiles.source);
var allTests = config.inputFiles.unitTests.concat(config.inputFiles.integrationTests);
var allJs = jsFiles.concat(allTests);

gulp.task("install", shell.task("npm install"));

gulp.task('setDeploymentDate', function () {
    return gulp.src('./package.json', {
        base: './'
    })
        .pipe(jsonEditor({
            'deploymentDate': new Date().toISOString()
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('setVersion', function () {
    if (!argv.version) {
        throw new Error("Version argument must be supplied");
    }
    return gulp.src('./package.json', {
        base: './'
    })
        .pipe(jsonEditor({
            'version': argv.version
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', function () {
    return gulp.src(allJs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', ['install', 'lint', 'unit-tests'], function () {
    nodemon({
        script: 'index.js',
        tasks: ['lint', 'unit-tests'],
        ext: 'js json',
        ignore: ['./coverage/**'],
        env: {
            'NODE_ENV': 'development'
        }
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('watchqa', ['lint', 'unit-tests'], function () {
    nodemon({
        script: 'index.js',
        tasks: ['lint', 'unit-tests'],
        ext: 'js json',
        ignore: ['./coverage/**'],
        env: {
            'NODE_ENV': 'qa'
        }
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('tests', function (callback) {
    gulp.src(jsFiles)
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(allTests, {
                read: false
            })
                .pipe(mocha({
                    reporter: 'spec'
                }))
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({thresholds: {global: 0}})) // Enforce a coverage of at least 0% probably a good idea to change this value
                .on('end', callback);
        });
});

gulp.task('unit-tests', function () {
    return gulp.src(config.inputFiles.unitTests, {
        read: false
    }).pipe(mocha({
        reporter: 'spec'
    }));
});

gulp.task('integration-tests', function () {
    return gulp.src(config.inputFiles.integrationTests, {
        read: false
    }).pipe(mocha({
        reporter: 'spec'
    }));
});
