/**
 * Created by meathill on 2017/6/13.
 */

const fs = require('fs');
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const cleanCSS = require('gulp-clean-css');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const sequence = require('run-sequence');
const del = require('del');
const cdn = require('./cdn.json');
const DOC = 'docs/';

gulp.task('clear', () => {
  return del([DOC]);
});

gulp.task('stylus', () => {
  return gulp.src('./styl/screen.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(DOC + 'css/'));
});

gulp.task('webpack', () => {
  return gulp.src('./app/main.js')
    .pipe(webpackStream(require('./webpack.config.prod'), webpack))
    .pipe(uglify({
      compress: {
        unused: true,
        dead_code: true
      }
    }))
    .pipe(gulp.dest(DOC + 'js/'));
});

gulp.task('html', () => {
  let baidu = fs.readFileSync('./app/baidu.js');
  return gulp.src('./index.dev.html')
    .pipe(replace(/node_modules\/([\w\-\.]+)\/(dist|build\/)?/g, (match, repo) => {
      return cdn[repo];
    }))
    .pipe(replace('dist/bundle.js', 'js/bundle.js'))
    .pipe(replace('</body>', `<script>${baidu}</script></body>`))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(DOC));
});

gulp.task('copy', () => {
  return gulp.src('img/**')
    .pipe(gulp.dest(DOC + 'img/'));
});

gulp.task('default', callback => {
  sequence(
    'clear',
    ['stylus', 'webpack', 'html', 'copy'],
    callback
  );
});