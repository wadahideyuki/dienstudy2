// gulpプラグインの読み込み
var gulp = require('gulp');
// エラーによる停止を防止するプラグインの読み込み
var plumber = require('gulp-plumber');
// デスクトップ通知のプラグインの読み込み
var notify = require('gulp-notify');
// Sassをコンパイルするプラグインの読み込み
var sass = require('gulp-sass');
// Sassを開発ツールで参照出来るようにするプラグインの読み込み
var sourcemaps = require('gulp-sourcemaps');
// パグ
var pug = require('gulp-pug');
// ブラウザシンク
var browsersync = require('browser-sync');
//画像の圧縮
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var imageminJpg = require('imagemin-jpeg-recompress');
var imageminPng = require('imagemin-pngquant');
var imageminGif = require('imagemin-gifsicle');
var svgmin = require('gulp-svgmin');



// パスの設定
var paths = {
  src: 'src',
  dest: './'
}

//Pug
gulp.task('html', function () {
  return gulp.src([
    paths.src + '/pug/**/*.pug',
    '!' + paths.src + '/pug/**/_*.pug'
  ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug({
      basedir: paths.src + '/pug/',
      pretty: true
    }))
    .pipe(gulp.dest(paths.dest))
});

//Sass
gulp.task('css', function () {
  return gulp.src([
    paths.src + '/css/**/*.scss',
    '!' + paths.src + '/css/**/_*.scss'
  ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    // ソースマップを初期化
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'expanded'
      })
      .on('error', sass.logError)
    )
    // ソースマップを保存
    .pipe(sourcemaps.write('./srcmap/'))
    .pipe(gulp.dest(paths.dest + 'common/css'))
});

//Browser Sync
gulp.task('browser-sync', function (done) {
  browsersync({
    server: { //ローカルサーバー起動
      baseDir: paths.dest
    }
  });
  done();
});

// jpg,png,gif画像の圧縮タスク
gulp.task('image', function () {
  console.log("gazou")
  var srcGlob = paths.src + '/**/*.+(jpg|jpeg|png|gif)';
  var dstGlob = paths.dest + '/common' ;
  gulp.src(srcGlob)
    .pipe(changed(dstGlob))
    .pipe(imagemin([
        imageminPng(),
        imageminJpg(),
        imageminGif({
        interlaced: false,
        optimizationLevel: 3,
        colors: 180
      })
    ]))
    .pipe(gulp.dest(dstGlob));
});

//Watch
gulp.task('watch', function () {
  const reload = () => {
    browsersync.reload(); //リロード
  };
  gulp.watch(paths.src + '/css/**/*').on('change', gulp.series('css', reload));
  gulp.watch(paths.src + '/pug/**/*').on('change', gulp.series('html', reload));
  gulp.watch(paths.src + '/images/**/*').on('change', gulp.series('image', reload));
});

//Default
gulp.task('default',
  gulp.series(
    //'clean',
    gulp.parallel(
      'html',
      'css',
      'image',
      'watch',
      'browser-sync'
    )));
