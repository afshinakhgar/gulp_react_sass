"use strict"
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');  
var size = require('gulp-size');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var babelify = require('babelify');

var del = require('del');
var browserify = require('browserify');
// var reactify = require('reactify');
// var run = require('gulp-run');
var source = require('vinyl-source-stream');

/*Folders*/
var resourceSrc = './resource/assets/';
var output = './public/assets/';
var dist_dir = '';

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'	
};

/**
 * Running Bower
 */
// gulp.task('bower', function() {
//   run('bower install').exec();
// });

/**
 * Cleaning dist/ folder
 */
gulp.task('clean', function(cb) {
	del([output+'**'], cb);
})

gulp.task('build-js', function() {
	gulp.src(resourceSrc+'js/*.js')
 	.pipe(gulp.dest(output+'js/app/application/src'))
 	// .pipe(gulp.dest(output+'js/app/application/run/general.js'))
	// .pipe(uglify())
    .pipe(gulp.dest(dist_dir));
});

function reactCompile(sourcefile){
   return browserify({
    entries: sourcefile,
	extensions: ['.js', '.jsx'],
    debug: true
  })
  .transform('babelify', {presets: ['stage-1','es2015', 'react']})
  .bundle()
  ;

}

gulp.task('react',['build-js'], function() {
	return reactCompile(resourceSrc+'js/app/app.js')
	.pipe(source(output+'js/app/src/app.js'))
	.pipe(gulp.dest(dist_dir));
});

// gulp.task('react:min',['build-js'], function() {
// 	return browserify(resourceSrc+'js/app/app.js')
// 	.transform(reactify)
// 	.bundle()
// 	.pipe(source(output+'js/app/run/app.js'))
// 	.pipe(buffer())
// 	.pipe(uglify())
// 	.pipe(gulp.dest(dist_dir));
// });

gulp.task('js',['react','build-js'], function() {
	return gulp.src(output+'js/app/**/*.js')
	// .pipe(sourcemaps.init())
	.pipe(concat('bundle.js'))
	//only uglify if gulp is ran with '--type production'
	// .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
	// .pipe(sourcemaps.write())
	.pipe(uglify())
	.pipe(gulp.dest(output+'js/run'));
});



// Sass Compile 
gulp.task('sass',function(cb){
	gulp.src(resourceSrc+'sass/**/*.scss')
	.pipe(sass(sassOptions).on('error', sass.logError))
	.pipe(concat('app.css'))
	.pipe(gulp.dest(output+'css/src'))
	.pipe(size());
	cb();
});

 



/*Minify and sourcemap For css Compiled by sass*/
gulp.task('css:min',['sass'], function() {
	setTimeout(
		function(){
			return gulp.src(output+'css/src/*.css')
		    .pipe(sourcemaps.init())
		    .pipe(minifyCss({compatibility: 'ie8'}))
		    .pipe(concat('app.css'))
		    .pipe(sourcemaps.write('.'))
		    .pipe(gulp.dest(output+'css/run'));
		},500
	);
});
gulp.task('watch',function(){
	gulp.watch(resourceSrc+'sass/**/*.scss',['sass','js','clean']);
});

gulp.task('watch:js',function(){
	gulp.watch(output+'js/app/**/*.js', ['js']);
});


gulp.task('build',['css:min','sass','js']);
gulp.task('default',['css:min','sass','js']);
// gulp.task('default',['sass']);
