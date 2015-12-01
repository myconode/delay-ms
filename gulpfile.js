/* jshint node:true, asi:true, esnext:true */
'use strict'

const gulp = require('gulp')
const mocha = require('gulp-mocha')

// Plugins
const jshint = require('gulp-jshint')

// File References
const ROOT = "./"
const GULPFILE = ROOT + "gulpfile.js"
const TESTS = ROOT + 'test/**/*'

// Task definition
gulp.task('lint', function(){
  return gulp.src( GULPFILE )
    .pipe( jshint() )
    .pipe( jshint.reporter('default'))
})

gulp.task('test', function(){
  let config = { reporter: 'dot'}

  return gulp.src( TESTS )
    .pipe( mocha(config) )
})

gulp.task('default', ['lint'] )
