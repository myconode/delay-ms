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
const PKG  = JSON.parse(fs.readFileSync(ROOT + 'package.json'))
const GULPFILE = ROOT + 'gulpfile.js'
const INDEX = ROOT + 'index.js'
const TESTS = ROOT + 'test/**/*'

const jshint_config = { node:true,
                        asi:true,
                        esnext:true
                      }

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
    .on('error', gutil.log);
})

gulp.task('publish', ['lint', 'test'], function (done) {
  spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});


gulp.task('tag', ['lint', 'test'], function(done){
  let tag = 'v' + PKG.version
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


gulp.task('default', ['lint'] )
gulp.task('release', ['tag', 'publish'])
