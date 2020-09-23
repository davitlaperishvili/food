function defaultTask(cb) {
    // place code for your default task here
    cb();
  }
  
  exports.default = defaultTask

  export function frontendStyles() {
    return gulp.src('assets/sass/main.scss')
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
    .pipe(gulp.dest('assets/css'));
}