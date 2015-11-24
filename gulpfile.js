
const gulp = require('gulp')

// Plugins
const jshint = require('gulp-jshint')
const jshint_styles = require('jshint-stylish')

// File References
const ROOT = "./"
const gulpfile = ROOT + "gulpfile.js"


// Task definition
gulp.task('lint', function(){
  return gulp.src( gulpfile )
    .pipe( jshint() )
    .pipe( jshint_reporter('jshint_styles') )
    .pipe( jshint_reporter('fail') )
}

gulp.task('default', ['lint'] )
