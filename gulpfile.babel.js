const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const browserSync = require('browser-sync');

const sync = browserSync.create();

const config = {
    paths: {
        src: {
            less: ['src/less/*.less'],
            js: ['src/js/*.js'],
            img: './src/img/**.*'
        },
        dist: {
            css: './css',
            js: './js',
            img: './img'
        }
    }
};

gulp.task('less', () => {
    return gulp.src(config.paths.src.less)
        .pipe(less())
        .pipe(gulp.dest(config.paths.dist.css))
        .pipe(sync.stream());
});

gulp.task('js', () => {
    return gulp.src(config.paths.src.js)
        .pipe(babel())
        .pipe(gulp.dest(config.paths.dist.js))
        .pipe(sync.stream());
});

gulp.task('build', gulp.series(['less', 'js']));

function server() {
    sync.init({
        server: {
            baseDir: "./"
        }
    });
};

gulp.task('default', gulp.series(['build']));

gulp.task('watch', gulp.series(['default'], function watch() {
    gulp.watch('src/less/*.less', gulp.series(['less']));
    gulp.watch('src/js/*.js', gulp.series(['js']));
    gulp.watch("./*.html").on('change', sync.reload);
    return server();
}));