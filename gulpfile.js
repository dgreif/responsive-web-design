var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
    //srcFiles = ['*.html', '*.css', 'app/**/*.html', 'app/**/*.css', 'app/**/*.js'];

//gulp.task('watch', function () {
//    gulp.watch(srcFiles, {cwd: 'public', livereload: true});
//});

gulp.task('dev', function () {
    nodemon({
        script: 'server.js', ext: 'js', ignore: []
    })
        .on('change', [])
        .on('restart', function () {
            console.log('JS files have changed, restarting node server');
        });
});

gulp.task('default', ['dev']);