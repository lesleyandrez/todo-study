var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/**
* Static Server + watching html/css/js files
*/
gulp.task('serve', function(){

  browserSync.init({
    server: "./src",
    files: [
      "./src/**/*.html",
      "./src/**/*.css"
    ]
  });

  gulp.watch("src/js-es5/__bundle.js").on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
