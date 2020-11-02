'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import fse from 'fs-extra';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import bourbon from 'bourbon';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import notifier from 'node-notifier';
import sourcemaps from 'gulp-sourcemaps';

import { backendConfig, frontendConfig } from './webpack.config.babel';

const statsLog = {
	colors: true,
	version: false,
	hash: false,
	timings: false,
	chunks: false
};

export const cleanPaths = (done) => {
	fse.emptyDir('markup/backend/scripts/css');
	fse.emptyDir('markup/backend/scripts/js');
	fse.emptyDir('scripts/backend/css');
	fse.emptyDir('scripts/backend/js');
	fse.emptyDir('markup/frontend/scripts/css');
	fse.emptyDir('markup/frontend/scripts/js');
	fse.emptyDir('scripts/frontend/css');
	fse.emptyDir('scripts/frontend/js');
	done();
}
export function backendStyles() {
	return gulp.src('resources/backend/sass/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: [bourbon.includePaths]
	}))
	.on('error', error => {
		const errorMessage = `Path: ${error.relativePath} at line ${error.line}`;

		notifier.notify({
			title: 'Error: Styles',
			message: errorMessage
		});
		gutil.log(gutil.colors.red('[Styles]'), gutil.colors.bgRed(errorMessage));
	})
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS({
		level: {
			1: {
				specialComments: 0
			}
		}
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('markup/backend/scripts/css'))
	.pipe(gulp.dest('scripts/backend/css'));
}
export function frontendStyles() {
	return gulp.src('resources/frontend/sass/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		includePaths: [bourbon.includePaths]
	}))
	.on('error', error => {
		const errorMessage = `Path: ${error.relativePath} at line ${error.line}`;

		notifier.notify({
			title: 'Error: Styles',
			message: errorMessage
		});

		gutil.log(gutil.colors.red('[Styles]'), gutil.colors.bgRed(errorMessage));
	})
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS({
		level: {
			1: {
				specialComments: 0
			}
		}
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('markup/frontend/scripts/css'))
	.pipe(gulp.dest('scripts/frontend/css'));
}
export function backendScripts(done) {
	webpack(backendConfig, onComplete);
	function onComplete(error, stats) {
		if (error) {
			onError(error);
		} else if (stats.hasErrors()) {
			onError(stats.toString(statsLog));
		} else {
			onSuccess(stats.toString(statsLog));
		}
	}
	function onError(error) {
		notifier.notify({
			title: 'Error: Backend Scripts',
			message: 'See terminal for more'
		});
		gutil.log(gutil.colors.red('[Backend Scripts]'), '\n' + error);
		done();
	}

	function onSuccess() {
		fse.copy('scripts/backend/js', 'markup/backend/scripts/js');
		done();
	}
}
export function frontendScripts(done) {
	webpack(frontendConfig, onComplete);
	function onComplete(error, stats) {
		if (error) {
			onError(error);
		} else if (stats.hasErrors()) {
			onError(stats.toString(statsLog));
		} else {
			onSuccess(stats.toString(statsLog));
		}
	}
	function onError(error) {
		notifier.notify({
			title: 'Error: Frontend Scripts',
			message: 'See terminal for more'
		});

		gutil.log(gutil.colors.red('[Frontend Scripts]'), '\n' + error);
		done();
	}
	function onSuccess() {
		fse.copy('scripts/frontend/js', 'markup/frontend/scripts/js');
		done();
	}
}
export function browser() {
	browserSync.init(['markup/**/*'], {
		logPrefix: '',
		proxy: 'localhost',
		notify: false,
		open: false,
		port: 3000
	});
}
export function watch() {
	gulp.watch(['resources/backend/**/*.scss', 'resources/backend/**/*.css'], backendStyles);
	gulp.watch(['resources/frontend/**/*.scss', 'resources/frontend/**/*.css'], frontendStyles);
	gulp.watch('resources/backend/**/*.js', backendScripts);
	gulp.watch('resources/frontend/**/*.js', frontendScripts);
}
export const build = gulp.series(cleanPaths, gulp.parallel(frontendStyles, backendStyles, frontendScripts, backendScripts));
export default gulp.series(build, gulp.parallel(browser, watch));