'use strict'

// Standard lib, Gulp
const fs = require('fs')
const spawn = require('child_process').spawn
const gulp  = require('gulp')

// Plugins
const jshint = require('gulp-jshint')
const mocha  = require('gulp-mocha')
const uglify = require('gulp-uglify')
const git = require('gulp-git')
const del = require('del')

// Utilities
const gutil = require('gulp-util')
const Q = require('q')

// File References
const ROOT = "./"
const PKG_JSON = ROOT + 'package.json'
const PKG_DATA = JSON.parse(fs.readFileSync(PKG_JSON))
const GULPFILE = ROOT + 'gulpfile.js'
const INDEX = ROOT + 'index.js'
const TESTS = ROOT + 'test/**/*'

const BUILD_DIR = ROOT + "build/"

const jshint_config = { node:true,
                        asi:true,
                        esnext:true
                      }

// Tasks
gulp.task('default', ['lint'] )


gulp.task('release', ['tag'], function(done){
  // Delete build directory after release
  del( [ BUILD_DIR + "/**", BUILD_DIR ] )
})


gulp.task('lint', function(){
  return gulp.src( [ GULPFILE, INDEX, TESTS ] )
    .pipe( jshint( jshint_config ) )
    .pipe( jshint.reporter('default', { verbose: true } ))
})


gulp.task('test', ['lint'], function(){
  let config = { reporter: 'dot'}

  return gulp.src( TESTS )
    .pipe( mocha( config ) )
    .on('error', gutil.log)
})


gulp.task('build', ['test'], function(){
  return gulp.src( INDEX )
    .pipe( uglify() )
    .pipe( gulp.dest( BUILD_DIR ) )
})


gulp.task('publish', ['build'], function (done) {
  spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
})


gulp.task('tag', ['publish'], function(done){
  let tag = 'v' + PKG_DATA.version
  let message = "npm release"
  let tagged = Q.defer()

  git.tag(tag, message, function (err) {
    if (err){
      console.log("Gulp: git tag failed:\n" + err)
      process.exit(1)
    } else {
      tagged.resolve()
    }
  })

  tagged.promise.then(function(){
    git.push('origin', tag, function(err){
      if(err) {
        console.log("Gulp: git push failed:\n" + err)
        process.exit(1)
      } else {
        done()
      }
    })
  })
})
