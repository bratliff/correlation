var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sass        = require('gulp-sass');
var injectSvg = require('gulp-inject-svg');
var reload      = browserSync.reload;

var src = {
    scss: 'app/scss/*.scss',
    css:  'app/css',
    html: 'src/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(src.scss, ['sass', 'injectSvg']);
    gulp.watch(src.html).on('change', reload);
    gulp.watch(src.html, ['copy', 'injectSvg']);

});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('injectSvg', function() {

  return gulp.src('./src/index.html')
    .pipe(injectSvg())
    .pipe(gulp.dest('./app'));

});
gulp.task('copy', function () {
   gulp.src('src/index.html')
   // Perform minification tasks, etc here
   .pipe(gulp.dest('./app'));

});


gulp.task('default', ['serve', 'copy', 'injectSvg']);
