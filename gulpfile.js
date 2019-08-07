const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const nano = require('gulp-cssnano');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const connect = require('gulp-connect');//实现浏览器同步更新

const option = { base: 'src' };
const dist = __dirname + '/dist';

function tasksass (){
	return gulp
	.src('src/style/ui.scss', option)
	.pipe(sourcemaps.init())
	.pipe(
		sass().on('error', function(e) {
			console.error(e.message);
			this.emit('end');
		})
	)
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(dist))
	.pipe(browserSync.reload({ stream: true }))
	.pipe(
		nano({
			zindex: false,
			autoprefixer: false
		})
	)
	.pipe(
		rename(function(path) {
			path.basename += '.min';
		})
	)
	.pipe(gulp.dest(dist))
	.pipe(connect.reload());
}

function html(){
	return gulp.src('src/html/*.html')
	// .pipe(browserSync.reload({ stream: true }))//这个暂时没有找到好的实现方法 看似好像没有用
	.pipe(gulp.dest('dist/html'))
	.pipe(connect.reload());
}
//实现浏览器同步更新 浏览器输入http://localhost:8080 
gulp.task('connect',function(){
	connect.server({
			root: './dist',//根目录
			livereload: true,//自动更新
			port: 8080//端口
	})
});
// gulp.task('sass', tasksass);
// gulp.task('html', html);
//parallel(...tasks)：多个任务同时执行 series(...tasks)：顺序执行多个任务
// exports.sass = gulp.parallel(tasksass);
// exports.build = gulp.parallel(tasksass);

gulp.task('watchs',function(){
	gulp.watch('src/html/*.html',gulp.parallel(html));
	gulp.watch('src/style/*.scss', gulp.parallel(tasksass));
})

// gulp.task('default',gulp.series(gulp.parallel('connect','watchs',tasksass,html)));
exports.default = gulp.series(gulp.parallel('connect','watchs',tasksass,html));