const gulp =require("gulp");
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const clean = require('gulp-clean');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const { exec } = require('child_process');

function js() {
  return gulp
    .src("./src/javascript.js")
    .pipe(gulp.dest("./build"));
}

function css() {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass())
    .pipe(csso())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
}

function html() {
  return gulp
    .src("./src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build"));
}

function clear() {
  return gulp.src('build', { read: false}).pipe(clean());
}

function tailwind(cb) {
  exec('npx tailwindcss -i ./src/scss/_input.scss -o ./src/scss/_output.scss', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}

function copyfolder() {
  return gulp.src('./src/js/**/*') 
    .pipe(gulp.dest('./build/js'));
  }

function copy() {
  return gulp
    .src("./src/assets/**/*", {
      encoding: false, 
    }).pipe(gulp.dest("./build"));
}

function watching() {
  gulp.watch("./src/scss/**/*.scss", css);
  gulp.watch("./src/*.html", html).on('change', browserSync.reload)
  gulp.watch('./src/_input.scss', tailwind ).on('change', browserSync.reload);
}

function tailwindWatch() {
  exec('npx tailwindcss -i ./src/scss/_input.scss -o ./src/scss/_output.scss --watch', function (err, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
  });
}

function server() {
  browserSync.init({
    server: {
        baseDir: "./build"
    }
});
}

function defaultTask(cb) {
  console.log("HELLO !!")
  cb();
}

exports.default = defaultTask;
exports.css = css;
exports.clear = clear;
exports.copyfolder = copyfolder;
exports.build = gulp.series(
  clear,
  gulp.parallel(css, html, copy, tailwind),
);

exports.start = gulp.series(
clear,
gulp.parallel(css, html, copyfolder, copy, tailwind),
gulp.parallel(watching, tailwindWatch,  server));