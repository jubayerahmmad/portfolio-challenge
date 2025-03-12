const gulp = require("gulp");
const postcss = require("gulp-postcss");
const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

const paths = {
  css: {
    src: "src/input.css",
    dest: "src/",
  },
  html: "index.html",
  images: "assets/**/*",
};

// Compile Tailwind CSS
gulp.task("css", function () {
  return gulp
    .src(paths.css.src)
    .pipe(postcss([tailwindcss, autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
});

// Live Reload with BrowserSync
gulp.task("serve", function () {
  browserSync.init({
    server: "./",
    notify: false,
    open: false,
    reloadDelay: 100,
  });

  gulp.watch(paths.css.src, gulp.series("css"));
  gulp.watch(paths.html).on("change", browserSync.reload);
  gulp.watch(paths.images).on("change", browserSync.reload);
});

// Default Task
gulp.task("default", gulp.series("css", "serve"));
