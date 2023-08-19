// const gulp = require("gulp");

// const cssnano = require("gulp-cssnano");
// const rev = require("gulp-rev");
// const uglify = require("gulp-uglify-es").default;
// const imagemin = require("gulp-imagemin");
// const del = require("del")

import gulp from "gulp";
// import gulpsass from "gulp-sass";
// import nodesass from "node-sass";
// const sass = gulpsass(nodesass);
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
import { deleteSync } from "del";
import gulpuglify from "gulp-uglify-es";
const uglify = gulpuglify.default;
import imagemin from "gulp-imagemin";

gulp.task("css", function (done) {
  console.log("minifying css...");

  gulp
    .src("./assets/**/*.css")
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...");
  gulp
    .src("./assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

gulp.task("images", function (done) {
  console.log("compressing images...");
  gulp
    .src("./assets/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
  done();
});

// empty the public/assets directory
gulp.task("clean:assets", function (done) {
  deleteSync("./public/assets");
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("Building assets");
    done();
  }
);
