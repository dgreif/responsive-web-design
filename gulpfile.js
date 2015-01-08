var gulp = require('gulp'),
    connect = require('gulp-connect'),
    srcFiles = ['*.html', '*.css'];

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