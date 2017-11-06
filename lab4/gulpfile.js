//"gulp": "node --max-old-space-size=4096 --optimize-for-size --max_executable_size=4096 node_modules/gulp/bin/gulp.js --max_new_space_size=4096"
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

gulp.task('css', function(){
    gulp.src('src/css/reset.css')
        .pipe(gulp.dest('./dist/css/'))
    gulp.src('./node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('./dist/css/'))
    gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'))
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

gulp.task('default', ['jade', 'css', 'image'], function(){
    
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/css/**/*.scss',['css']);
    gulp.watch('src/**/*.jade',['jade']);
    gulp.watch('src/images/src/**/*',['image']);
});