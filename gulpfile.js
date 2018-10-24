// Importando plugins utilizados no projeto
const
    gulp = require("gulp");
    cssmin = require('gulp-minify-css');
    concat = require("gulp-concat");
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    imagemin = require("gulp-imagemin");
    replace = require("gulp-replace");
    htmlreplace = require("gulp-html-replace");
    htmlmin = require("gulp-htmlmin");
    /*netlify = require("gulp-netlify");*/
    runSequence = require("run-sequence");

gulp.task('optimize-css', function () {
    // minificando/concatenando/renomeando arquivos CSS
    return gulp.src(['src/css/**/*.css'])
        .pipe(cssmin())
        .pipe(concat('styles.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task("replace-css", function () {
    // acertando caminhos de links nos arquivos CSS
    return gulp.src(["dist/css/styles.min.css"])
            .pipe(replace("(../../", "(../"))
            .pipe(gulp.dest("dist/css"))});

gulp.task("optimize-js", function() {
  // minificando/concatenando/renomeando arquivos JS
    return gulp.src(["src/js/components/main-accordion.js", "src/js/tools/*.js"])
        .pipe(uglify())
        .pipe(concat("scripts.js"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("optimize-img", function () {
    // Otimizando imagens 
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("replace-html", function () {
    // renomeando links de css e js minificados carregados no html
    return gulp.src(["src/*.html"])
        .pipe(htmlreplace({
            "allcss": "css/styles.min.css",
            "alljs": "js/scripts.min.js",
            "sobtnmenu": "js/main-btnMenu.js",
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("optimize-html", function() {
    // Otimizando html
    return gulp.src(["dist/*.html"])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/"));
});

gulp.task("copy", function() {
  // Cópias de arquivos JS sem otimização
    return  gulp.src(["src/js/components/main-btnMenu.js"])
                .pipe(gulp.dest("dist/js")),
            gulp.src(["src/font/*"])
                .pipe(gulp.dest("dist/font"));
});
/*
gulp.task("deploy", function() {
    // deploy no Netlify
    return gulp.src("dist/*")
    .pipe(netlify({
        site_id: "a97af9e6-4d4e-4a77-bd0b-729587e26d9b",
        access_token: "474d5d8999e72c67105040bd4a37a7eb41ba12eb53a6527045765e71c7280caa"
    }))
});*/


gulp.task('default', function (done) {
    // Task que será executada quando dermos o comando "gulp"
    runSequence(
            "optimize-css",
            "replace-css",
            "optimize-js",
            "optimize-img",
            "replace-html",
            "optimize-html",
            "copy",
            /*"deploy",*/
      function() {
        done();
      }
    );
});