var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    cleanCSS        = require('gulp-clean-css'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    notify          = require("gulp-notify"),
    cache           = require('gulp-cache'),
    rename          = require('gulp-rename'),
    del             = require('del'),
    browserSync     = require('browser-sync');


gulp.task('jade', function() {
    return gulp.src('src/jade/index.jade')
    .pipe(jade({
        pretty: true
    }))
    .on('error', notify.onError(function(err) {
        return {
          title: 'Sass',
          message: err.message
        }
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('sass', function() {
    return gulp.src('src/sass/main.sass')
        .pipe(sass())
        .on('error', notify.onError(function(err) {
            return {
              title: 'Sass',
              message: err.message
            }
        }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.reload({stream: true}));
})

// gulp.task('css-min', ['sass'], function() {
//   return gulp.src('src/css/main.css')
//     .pipe(cleanCSS())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('src/css'));
// })


gulp.task('scripts', function() {
    return gulp.src([
        'src/libs/jquery/dist/jquery.min.js',
        'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'src/libs/waypoints/lib/jquery.waypoints.min.js',
        'src/libs/anumate-number/jquery.animateNumber.min.js',
        'src/libs/equal-height/equal-height.min.js',
        'src/libs/owl.carousel/dist/owl.carousel.min.js',
        'src/libs/selectize/dist/js/standalone/selectize.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
})

gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
})

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src/'
        },
        notify: false
    });
});


gulp.task('watch', ['browser-sync',  'sass', 'jade', 'scripts'], function() {
    gulp.watch('src/sass/**/*', ['sass']);
    gulp.watch('src/jade/**/*.jade', ['jade']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*', browserSync.reload);
})


gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function() {
    return cache.clearAll();
});


gulp.task('build', ['clean', 'img' , 'sass', 'scripts', 'jade'], function() {

    var buildCss = gulp.src('src/css/*')
      .pipe(gulp.dest('dist/css/'))

    var buildFonts = gulp.src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts/'));

    var buildJS = gulp.src('src/js/**/*')
      .pipe(gulp.dest('dist/js/'));

    var buildHTML = gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['watch']);
