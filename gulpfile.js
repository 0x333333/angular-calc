var gulp = require('gulp');

var less         = require('gulp-less');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var minifyCss    = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');

gulp.task('lessSrc', function () {
  gulp.src(['src/calc.less'])
    .pipe(less())
    .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('src'))
    ;
});

gulp.task('lessDemo', function () {
  gulp.src(['demo/index.less'])
    .pipe(less())
    .pipe(postcss([autoprefixer({browsers: ['last 2 version']})]))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('demo'))
    ;
});

gulp.task('inject', function() {
  gulp.src('src/calc.html')
    .pipe(templateCache({
      module: 'ez.calc'
    }))
    .pipe(rename('calc.tpl.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('compress', function() {
  return gulp.src('src/calc.js')
    .pipe(uglify())
    .pipe(rename('calc.min.js'))
    .pipe(gulp.dest('src'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.less', ['lessSrc']);
  gulp.watch('demo/*.less', ['lessDemo']);
});

gulp.task('default', ['lessSrc', 'lessDemo', 'inject', 'compress', 'watch']);
