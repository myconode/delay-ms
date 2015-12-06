'use strict'

// Standard lib, Gulp
const fs = require('fs')
const spawn = require('child_process').spawn
const gulp  = require('gulp')

// Plugins
const jshint = require('gulp-jshint')
const mocha  = require('gulp-mocha')
const git = require('gulp-git')

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

const jshint_config = { node:true,
                        asi:true,
                        esnext:true
                      }

// Tasks
gulp.task('default', ['lint'] )

gulp.task('lint', function(){
  return gulp.src( [ GULPFILE, INDEX, TESTS ] )
    .pipe( jshint( jshint_config ) )
    .pipe( jshint.reporter('default', { verbose: true } ))
})

// mocha tests
gulp.task('test', ['lint'], function(){
  let config = { reporter: 'dot'}

  return gulp.src( TESTS )
    .pipe( mocha( config ) )
    .on('error', gutil.log)
})


// npm publish if tests pass
gulp.task('publish', ['test'], function (done) {
  spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
})


// create git tag & github release if package was published
gulp.task('release', ['publish'], function(done){
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
