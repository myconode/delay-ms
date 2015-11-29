/* jshint node:true, asi:true, esnext:true */

const gulp = require('gulp')

// Plugins
const jshint = require('gulp-jshint')

// File References
const ROOT = "./"
const gulpfile = ROOT + "gulpfile.js"

// Task definition
gulp.task('lint', function(){
  return gulp.src( gulpfile )
    .pipe( jshint() )
    .pipe( jshint.reporter('default'))
})

gulp.task('default', ['lint'] )
