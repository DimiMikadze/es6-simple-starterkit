const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const webpackConfig = require("./webpack.config.js");

// Html
gulp.task('html', () => {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'));
});

// Sass
gulp.task('sass', () => {
    gulp.src('./src/sass/bundle.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

// Javascript
gulp.task('scripts', () => {
    webpackConfig.devtool = 'eval';
    webpackConfig.debug = true;
    gulp.src('./src/js/app.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist/js/'));
});

// Production
gulp.task('build', () => {
    // Javascript
    webpackConfig.devtool = 'source-map';
    webpackConfig.debug = false;
    webpackConfig.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            minimize: true
        })
    ];
    gulp.src('./src/js/app.js')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist/js/'));
    // Sass
    gulp.src('./src/sass/bundle.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'));
    // Html
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist/'));
});

// Development watch
gulp.task('watch', () => {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', ['html']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
});
