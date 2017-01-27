import gulp from 'gulp'

import htmlmin from 'gulp-htmlmin'
import imagemin from 'gulp-imagemin'
import php from 'gulp-connect-php'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import buffer from 'vinyl-buffer'
import cssnano from 'cssnano'
import del from 'del'
import fontMagician from 'postcss-font-magician'
import reporter from 'postcss-reporter'
import rollup from 'rollup-stream'
import runSequence from 'run-sequence'
import scss from 'postcss-scss'
import source from 'vinyl-source-stream'
import stylelint from 'stylelint'

gulp.task('sass', () => {
  const includePaths = [
    './node_modules/bootstrap-sass/assets/stylesheets/',
    './node_modules/jasny-bootstrap/scss/',
    './node_modules/font-awesome/scss/'
  ]
  const preSassProcessors = [
    stylelint(),
    reporter({ clearMessages: true })
  ]
  const postSassProcessors = [
    fontMagician(),
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano()
  ]

  return gulp.src('./src/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(postcss(preSassProcessors, { syntax: scss }))
    .pipe(sass({ includePaths: includePaths }).on('error', sass.logError))
    .pipe(postcss(postSassProcessors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream({ match: '**/*.css' }))
})

gulp.task('rollup', () => {
  return rollup('rollup.config.js')
    .pipe(source('./main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('imagemin', () => {
  return gulp.src('./src/images/**/*.{gif,jpg,png,svg,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist'))
})

gulp.task('htmlmin', () => {
  return gulp.src('./src/markup/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('copy:fonts', () => {
  return gulp.src('./node_modules/font-awesome/fonts/fontawesome-webfont.*')
    .pipe(gulp.dest('./dist'))
})

gulp.task('clean', () => {
  return del(['dist'])
})

gulp.task('php', ['build'], () => {
  return php.server({
    port: 3000,
    base: './dist'
  })
})

gulp.task('watch', () => {
  // Must use relative paths for gulp.watch() tasks so new and deleted files
  // are detected
  gulp.watch('src/styles/**/*.scss', ['sass'])
  gulp.watch('src/scripts/**/*.js', ['watch-scripts'])
  gulp.watch('src/images/**/*.{gif,jpg,png,svg,ico}', ['watch-images'])
  gulp.watch('src/markup/**/*.html', ['watch-markup'])
})

// Reload browser _after_ required tasks are completed
// https://www.browsersync.io/docs/gulp#gulp-reload
gulp.task('watch-scripts', ['rollup'], (done) => { browserSync.reload(); done() })
gulp.task('watch-images', ['imagemin'], (done) => { browserSync.reload(); done() })
gulp.task('watch-markup', ['htmlmin'], (done) => { browserSync.reload(); done() })

gulp.task('build', (finished) => {
  return runSequence('clean', ['sass', 'rollup', 'imagemin', 'htmlmin',
    'copy:fonts'], finished)
})

gulp.task('serve', ['build', 'watch', 'php'], () => {
  return browserSync.init({
    proxy: 'localhost:3000',
    ui: false,
    open: false
  })
})

gulp.task('default', ['serve'])
