// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber'); // handle error and "broken pipes"
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['static/js/**/*.js','!static/js/**/*angular.min*','!static/js/**/*jquery*'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('static/css/app.scss')
        .pipe(plumber()) // prevent sass from breaking on error.
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('static/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['bower_components/angular/angular.js',
                     'bower_components/jquery/dist/jquery.js',
                     'bower_components/angular-ui-router/release/angular-ui-router.js',
                     'static/js/**/*config.js',
                     'static/js/**/*model.js',
                     'static/js/**/*routes.js',
                     'static/js/**/*service.js',
                     'static/js/**/*controller.js',
                     'static/js/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('static/dist'))
        .pipe(ngAnnotate())
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('static/dist'));
})

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('static/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('static/css/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);