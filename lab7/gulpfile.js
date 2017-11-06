var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
var jade = require('gulp-jade');
//var sass = require('gulp-sass');
var compass = require('gulp-compass');
var sass = require('gulp-ruby-sass');

gulp.task('css', function(){
    gulp.src(['src/css/reset.css'])
       	.pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream: true}))
	gulp.src(['./node_modules/normalize.css/normalize.css'])
		.pipe(gulp.dest('./dist/css/'))
		.pipe(reload({stream: true}))
});

gulp.task('scss', function(){
    gulp.src(['src/scss/**/*.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(compass({
            css: './dist/css',
            sass: 'src/scss',
            image: './dist/images'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream: true}))
});

gulp.task('jade', function(){
    gulp.src(['src/**/*.jade'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('./dist'))
        .pipe(reload({stream: true}))
});

gulp.task('image', function(){
    gulp.src(['src/images/**/*'])
        .pipe(gulp.dest('./dist/images'))
        .pipe(reload({stream: true}))
});

gulp.task('scss_watch', function(){
    gulp.watch('/src/css/style.scss', ['scss']);
});

gulp.task('default', ['scss', 'css', 'jade','image'], function(){
    
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('/src/css/style.scss', ['scss']);
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/images/**/*', ['image']);
});