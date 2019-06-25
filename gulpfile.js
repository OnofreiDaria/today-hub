let gulp           = require('gulp');
let browserSync    = require('browser-sync').create();
let runSequence    = require('run-sequence');
let cnf            = require('./package.json').config;

const sass         = require('gulp-sass');
const importCss    = require('gulp-import-css');
const autoprefixer = require('gulp-autoprefixer');

const plumber      = require('gulp-plumber');
let notify         = require("gulp-notify");

let cssnano        = require('gulp-cssnano');
let rename         = require('gulp-rename');
let sourcemaps     = require('gulp-sourcemaps');
let fileinclude    = require('gulp-file-include');
let babel          = require('gulp-babel');
let include        = require("gulp-include");
// let uglify         = require('gulp-uglify');
// let pump           = require('pump');
const imagemin     = require('gulp-imagemin');

//browser Sync

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        },
        files: ['dist/**/*.*']
    });
});

gulp.task('default', function() {
    runSequence(
        'build', [
            'sass:watch',
            'html:watch',
            'js:watch',
            'fonts:watch',
            'img:watch',
            'libs:watch'
        ],
        'server'

    );
});

// RUN sequence
gulp.task('build', function() {
    runSequence(
        'sass',
        'html',
        'js',
        'fonts',
        'img',
        'libs'
    );
});


// CSS
gulp.task('sass', function () {
    return gulp.src(cnf.src.sass)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions' , 'ie 10'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({
            dirname: "",
            basename: "main",
            prefix: "",
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cnf.dist.css));
});


// HTML
gulp.task('html', function () {
    return gulp.src(cnf.src.html)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(cnf.dist.html));
});


// JS
gulp.task('js', function () {
    return gulp.src(cnf.src.js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(babel())
        .pipe(include({
            extensions: "js",
            hardFail: true
        }))
        // .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cnf.dist.js));
});

// gulp.task('uglify-error-debugging', function (cb) {
//     pump([
//         gulp.src('src/**/*.js'),
//         uglify(),
//         gulp.dest('./dist/')
//     ], cb);
// });

// FONTS
gulp.task('fonts', function () {
    return gulp.src(cnf.src.fonts)
        .pipe(gulp.dest(cnf.dist.fonts));
});

// IMAGES

gulp.task('img', function () {
          gulp.src(cnf.src.img.all)
             .pipe(imagemin([
                 imagemin.gifsicle({interlaced: true}),
                 imagemin.jpegtran({progressive: true}),
                 imagemin.optipng({optimizationLevel: 5}),
                 imagemin.svgo({
                     plugins: [
                         {removeViewBox: false},
                         {cleanupIDs: false}
                     ]
                 })
             ]))
        .pipe(gulp.dest(cnf.dist.img));
    gulp.src(cnf.src.img.noCompress)
        .pipe(gulp.dest(cnf.dist.img));
});


// LIBS CSS and JS

gulp.task('libs', function () {
     gulp.src(cnf.libs.css)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(importCss())
        .pipe(cssnano())
        .pipe(rename({
            dirname: "",
            basename: "libs",
            prefix: "",
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest(cnf.dist.css));

    gulp.src(cnf.libs.js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(babel())
        .pipe(include({
            extensions: "js",
            hardFail: true
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(cnf.dist.js));
});





// WATCH FILES

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('html:watch', function () {
    gulp.watch('src/**/*.html', ['html']);
});
gulp.task('js:watch', function () {
    gulp.watch([cnf.src.js, 'src/js/components/**/*.*'], ['js']);
});
gulp.task('fonts:watch', function () {
    gulp.watch(cnf.dist.fonts, ['fonts']);
});
gulp.task('img:watch', function () {
    gulp.watch('src/img/**/*.*', ['img']);
});

gulp.task('libs:watch', function () {
    gulp.watch(cnf.libs.css, ['libs']);
    gulp.watch(cnf.libs.js, ['libs']);
});