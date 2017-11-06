var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
gulp.task('css',function(){
    gulp.src(['src/css/**/*.css'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}))
});
gulp.task('js',function(){
    gulp.src(['src/js/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream: true}))
});
gulp.task('jade',function(){
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
gulp.task('default', ['jade', 'js', 'css'], function(){
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/css/**/*.css',['css']);
    gulp.watch('src/**/*.jade',['jade']);
    gulp.watch('images/src/**/*',['image']);
});