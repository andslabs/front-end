var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var stylus = require('gulp-stylus');
var less = require('gulp-less');

gulp.task('css', function(){
    gulp.src(['src/css/**/*.css'])
       	.pipe(gulp.dest('./dist/css/'))
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
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream: true}))
});

gulp.task('styl', function(){
    gulp.src(['src/styl/**/*.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({stream: true}))
});

gulp.task('lesses', function(){
    gulp.src(['src/less/**/*.less'])
        .pipe(less())
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

gulp.task('default', ['scss','css','styl','lesses','jade','image'], function(){
    
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/styl/**/*.styl', ['styl']);
    gulp.watch('src/less/**/*.less', ['lesses']);
    gulp.watch('src/**/*.jade', ['jade']);
    gulp.watch('src/images/**/*', ['image']);
});