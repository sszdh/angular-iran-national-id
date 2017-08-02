'use strict'

var fs = require('fs');
var gulp = require('gulp');
var iife = require("gulp-iife");
var header = require('gulp-header');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var karma = require('karma').Server;


var src = [
  'src/module.js',
  'src/directive.js'
];

var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * @link <%= pkg.homepage %>',
  ' * @author <%= pkg.author %>',
  ' * @example <input ng-model="nationalid" maxlength="10" min-length="10" islet-iran-national-id />',
  ' * @license under <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('test', testTask);
gulp.task('js', ['test'], jsTask);
gulp.task('watch', ['js'], watchTask);
gulp.task('build', ['js']);
gulp.task('default', ['watch']);

function jsTask() {
  var pkg = JSON.parse(fs.readFileSync('./package.json'));

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
  }, function() {
    done();
  }).start();
}

function watchTask() {
  gulp.watch(['*.json', 'src/**/*.js', 'test/**/*.spec.js'], ['js']);
}
