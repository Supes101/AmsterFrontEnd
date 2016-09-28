/// <binding ProjectOpened='buidLibFolder' />
var gulp = require('gulp');
var clean = require('gulp-clean');
var destPath = './wwwroot/libs/';

// Delete the dist directory
gulp.task('clean', function () {
    return gulp.src(destPath)
        .pipe(clean());
});

gulp.task('buildLibFolder', function () {
    return gulp.src([
                     'node_modules/**//core-js/client/shim.min.js'
                    , 'node_modules/**//zone.js/dist/zone.js'
                    , 'node_modules/**//reflect-metadata/Reflect.js'
                    , 'node_modules/**//systemjs/dist/*.js'
                    , 'node_modules/**//angular2/es6/dev/src/testing/*.js'
                    , 'node_modules/**//@angular/**/*.js'
                    , 'node_modules/**//rxjs/**/*.js'
    ])

      .pipe(gulp.dest('wwwroot/lib/./'));
});