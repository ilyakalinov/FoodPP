var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

let cssFiles = [
		'./src/css/style.css'
];

function clear(){
	return del('./build/*');
}

function styles() {
	return gulp.src(cssFiles)
				.pipe(sourcemaps.init())
				.pipe(concat('style.css'))
		        .pipe(autoprefixer({
		        	browsers: ['> 0.1%'],
		            cascade: false
		        }))
		        .pipe(cleanCSS({
		        	level: 2
		        }))
		        .pipe(sourcemaps.write())
				.pipe(gulp.dest('./build/css'))
				.pipe(browserSync.stream());
};

function img() {
	return gulp.src('./src/img/**/*')
				.pipe(gulp.dest('./build/img'))
				.pipe(browserSync.stream());
};
function icons() {
	return gulp.src('./src/icons/**/*')
				.pipe(gulp.dest('./build/icons'))
				.pipe(browserSync.stream());
};
function fonts() {
	return gulp.src('./src/fonts/**/*')
				.pipe(gulp.dest('./build/fonts'))
				.pipe(browserSync.stream());
};
function css___styles() {
	return gulp.src('./src/css/slick.css')
				.pipe(gulp.dest('./build/css'));
};
function css__styles() {
	return gulp.src('./src/css/jquery.fancybox.css')
				.pipe(gulp.dest('./build/css'));
};
function css_styles() {
	return	gulp.src('./src/css/reset.css')
				.pipe(gulp.dest('./build/css'));
};
function css_styles() {
	return	gulp.src('./src/css/global.css')
				.pipe(gulp.dest('./build/css'));
};
function html() {
	return gulp.src('./src/index.html')
				.pipe(gulp.dest('./build'))
				.pipe(browserSync.stream());
};
function php() {
	return gulp.src('./server.php')
				.pipe(gulp.dest('./build'))
				.pipe(browserSync.stream());
};
function js(){
	return gulp.src('./src/js/*.js')
			//.pipe(gulp.dest('./build/js'))
			.pipe(browserSync.stream());
};

function watch(){
	gulp.watch('./src/css/**/*.css', styles)
	gulp.watch('./src/index.html', html)
	gulp.watch('./src/js/script.js', js)
	gulp.watch('src/img/**/*', img)
	gulp.watch('./server.php', php)
	browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
};

let build = gulp.series(clear,
	gulp.parallel(icons, styles, img, html, php));

gulp.task ('build', build);
gulp.task('watch', gulp.series(build, watch));