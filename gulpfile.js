var gulp = require('gulp'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    sassSrc = ['public/app/sass/**/*.scss'];
//srcFiles = ['*.html', '*.css', 'app/**/*.html', 'app/**/*.css', 'app/**/*.js'];



gulp.task('server', function () {
    nodemon({
        script: 'server.js', ext: 'js', ignore: []
    })
        .on('change', [])
        .on('restart', function () {
            console.log('JS files have changed, restarting node server');
        });
});

gulp.task('sass', function () {
    gulp.src(sassSrc)
        .pipe(sass())
        .pipe(gulp.dest('public/app/css'))
        .pipe(livereload());
});

gulp.task('reload', function () {
    gulp.src(['public/app/index.html'])
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(sassSrc, ['sass']);
    gulp.watch(['public/**/*.html', 'public/**/*.js'], ['reload']);
});

gulp.task('default', ['sass'], function () {
    gulp.start('server');
});

gulp.task('dev', ['sass'], function () {
    gulp.start('server', 'watch');
});