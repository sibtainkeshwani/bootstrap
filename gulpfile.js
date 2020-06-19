//Variables construct

const
    env             = process.env.NODE_ENV || 'development'; //'production' - for production files. 'development' - for development purpose
    gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    header          = require('gulp-header'),
    sass            = require('gulp-sass'),
    reload          = browserSync.reload,
    concat          = require('gulp-concat'),
    iff             = require('gulp-if'),
    rename          = require('gulp-rename'),
    replace         = require('gulp-replace'),
    sourcemaps      = require('gulp-sourcemaps'),
    terser          = require('gulp-terser');

const
    root        = './',
    scss        = root + 'src/scss/',
    scssframe   = scss + 'framework/',
    scsscustom  = scss + 'custom/',
    cssdist     = root + 'assets/css/',
    js          = root + 'src/js/',
    jsframe     = js + 'framework/',
    jsconfig    = js + 'script/',
    jsdist      = root + 'assets/js/';

const
    htmlwatchfile = root + '*.html',
    stylewatchfiles = scss + '**/*.scss',
    jswatchfiles = js + '**/*.js';

const
    constconfig = [
        jsconfig + 'script.js'
    ];


//Gulp Task configurations

gulp.task('framework', function () {
    return gulp.src(scssframe + 'bootstrap.scss')
        .pipe(iff(env === 'development' , sourcemaps.init()))
        .pipe(iff(env === 'development', sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError)))
        .pipe(iff(env === 'production', sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError)))
        .pipe(autoprefixer({
            cascade: true,
            overrideBrowserslist: ['last 40 version'],
        }))
        .pipe(header(copyright, { pkg: pkg }))
        .pipe(iff(env === 'development' , sourcemaps.write('.')))
        .pipe(gulp.dest(cssdist))
        .pipe(browserSync.stream());
});

gulp.task('custom', function () {
    return gulp.src(scsscustom + 'custom.scss')
        .pipe(iff(env === 'development' , sourcemaps.init()))
        .pipe(iff(env === 'development', sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError)))
        .pipe(iff(env === 'production', sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError)))
        .pipe(autoprefixer({
            cascade: true,
            overrideBrowserslist: ['last 40 version'],
        }))
        .pipe(header(copyright, { pkg: pkg }))
        .pipe(iff(env === 'development' , sourcemaps.write('.')))
        .pipe(gulp.dest(cssdist))
        .pipe(browserSync.stream());
});

gulp.task('script', function () {
    return gulp.src(constconfig)
        .pipe(iff(env === 'development' , sourcemaps.init()))
        .pipe(concat('script.js'))
        .pipe(terser({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(header(copyright, { pkg: pkg }))
        .pipe(iff(env === 'development' , sourcemaps.write('.')))
        .pipe(gulp.dest(jsdist));
});

//Adding copyright notice
const pkg = require('./package.json');

const copyright = [
    '/*!',
    `* ${pkg.name} - v${pkg.version}`,
    `* @author ${pkg.author} - (${pkg.homepage})`,
    `* ${pkg.description}`,
    `* Copyright(c)${new Date().getFullYear()}`,
    `* Licensed under ${pkg.license} ( ${pkg.homepage}/LICENSE )`,
    `*/`,
    ``,
    ``,
    '',

].join('\n');

gulp.task('build', gulp.parallel('framework', 'custom', 'script'));


//Creates watchman for change lookup in assets and src
gulp.task('watchman', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000,
    });
    gulp.watch(stylewatchfiles, gulp.parallel('framework'));
    gulp.watch(stylewatchfiles, gulp.parallel('custom'));
    gulp.watch(constconfig, gulp.parallel('script'));
    gulp.watch([htmlwatchfile , stylewatchfiles, jswatchfiles]).on('change', reload);
});