var gulp = require('gulp'),
    connect = require('gulp-connect'),
    srcFiles = ['*.html', '*.css', 'app/**/*.html', 'app/**/*.css', 'app/**/*.js'];

gulp.task('serve', function () {
    connect.server({
        port: 8080,
        livereload: true
    });
});

gulp.task('reload', function () {
    gulp.src(srcFiles)
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(srcFiles, ['reload']);
});

gulp.task('default', ['serve', 'watch']);