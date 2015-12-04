'use strict'

const gulp = require('gulp')
const mocha = require('gulp-mocha')

// Plugins
const jshint = require('gulp-jshint')

// File References
const ROOT = "./"
const PKG  = JSON.parse(fs.readFileSync(ROOT + 'package.json'))
const GULPFILE = ROOT + 'gulpfile.js'
const INDEX = ROOT + 'index.js'
const TESTS = ROOT + 'test/**/*'

const jshint_config = { node:true, asi:true, esnext:true }

// Task definition
gulp.task('lint', function(){
  return gulp.src( [ GULPFILE, INDEX, TESTS ] )
    .pipe( jshint( jshint_config ) )
    .pipe( jshint.reporter('default', { verbose: true } ))
})

gulp.task('test', function(){
  let config = { reporter: 'dot'}

  return gulp.src( TESTS )
    .pipe( mocha( config ) )
})

gulp.task('default', ['lint'] )
