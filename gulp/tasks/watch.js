const gulp = require("gulp"),
  browserSync = require("browser-sync").create();

var $ = require("gulp-load-plugins")({
  pattern: ["gulp-*", "gulp.*"],
  replaceString: /\bgulp[\-.]/,
  lazy: true,
  scope: ["dependencies", "devDependencies"]
});

gulp.task("watch", function() {
  $.util.log("---------------------------------------");
  $.util.log("Night gathers, and now my watch begins.");
  $.util.log("---------------------------------------");

  browserSync.init({
    // Customize the Browsersync console logging prefix
    logPrefix: " 💻 ",
    server: {
      baseDir: "app",
      index: "index.html"
    },
    port: 3000
  });

  $.watch("./app/index.html", function() {
    browserSync.reload();
  });

  $.watch("./app/assets/styles/**/*.+(css|scss)", function() {
    gulp.start("cssInject");
  });

  $.watch("./app/assets/scripts/**/*.js", function() {
    gulp.start("scriptsRefresh");
  });
});

gulp.task("cssInject", ["styles"], function() {
  return gulp.src("./app/temp/styles/main.css").pipe(browserSync.stream());
});

gulp.task("scriptsRefresh", ["scripts"], function() {
  browserSync.reload();
});
