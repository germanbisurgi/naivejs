var gulp = require('gulp');
var concat = require('gulp-concat');
var scripts = [
  './src/intro.js',
  './src/polyfills.js',
  './src/pool.js',
  './src/loop.js',
  './src/signal.js',
  './src/game.js',
  './src/state.js',
  './src/render.js',
  './src/outro.js'
];

gulp.task('concat-dist', function () {
  gulp.src(scripts)
    .pipe(concat('comp.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('concat-test', function () {
  gulp.src(scripts)
    .pipe(concat('comp.js'))
    .pipe(gulp.dest('./tests/manual'));
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', ['concat-dist', 'concat-test']);
});
