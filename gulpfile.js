'use strict'

var fs = require('fs');
var gulp = require('gulp');
var iife = require("gulp-iife");
var header = require('gulp-header');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var karma = require('karma').Server;

var pkg = JSON.parse(fs.readFileSync('./package.json'));
var src = [
  'src/module.js',
  'src/directive.js'
];

var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @example <<input ng-model="nationalid" maxlength="10" min-length="10" islet-iran-national-id />',
  ' * @license under <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('js', jsTask);
gulp.task('watch', watchTask);
gulp.task('test', testTask);
gulp.task('default', ['test', 'js', 'watch']);

function jsTask() {
  gulp.src(src)
    .pipe(concat(pkg.name + '.js'))
    .pipe(iife())
    .pipe(minify({
      ext: {src:'.js', min:'.min.js'}
    }))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(gulp.dest('dist'));
}

function testTask(done) {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
}

function watchTask() {
  gulp.watch('src/*.js', ['test', 'js']);
}
