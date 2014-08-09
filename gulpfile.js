var gulp = require('gulp'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-ruby-sass'),
    desktopDist = "./dist/desktop/",
    webDist = "./dist/web/";

function buildScripts(additionalSourceFolder, destination) {
    var source = [
        'src/app/lib/angular.js',
        'src/app/lib/**/*.js',
        'src/app/js/common/services.js',
        'src/app/js/common/controllers.js',
        'src/app/js/common/**/*.js',
        additionalSourceFolder];
    
    // Output original files for the source map
    gulp.src(source, { base: './' }).pipe(gulp.dest(destination));
    
    // Output minified and concatinated scripts with source map
    return gulp.src(source)
        .pipe(uglify('app.min.js', {outSourceMap: true, mangle:false, compress:false}))
        .pipe(gulp.dest(destination));
}

function buildStyles(destination) {
    return gulp.src('src/app/styles/main.scss')
        .pipe(sass({ style: 'compact', }))
        .pipe(gulp.dest(destination))
}

function moveStaticFiles(destination) {
    return gulp.src(["src/app/img/**/*", "src/app/partials/**/*", "src/app/font/**/*", "src/app/index.html"], { base: './src/app/' })
        .pipe(gulp.dest(destination));
}

gulp.task('desktop-scripts', buildScripts.bind(null, "src/app/js/desktop/**/*.js", desktopDist + "js"));
gulp.task('web-scripts', buildScripts.bind(null, "src/app/js/web/**/*.js", webDist + "js"));
gulp.task('desktop-styles', buildStyles.bind(null, desktopDist + "css"));
gulp.task('web-styles', buildStyles.bind(null, webDist + "css"));
gulp.task('desktop-static', moveStaticFiles.bind(null, desktopDist));
gulp.task('web-static', moveStaticFiles.bind(null, webDist));
gulp.task('desktop-configuration', function() {
    return gulp.src("src/desktop/*", { base: './src/desktop/' })
        .pipe(gulp.dest(desktopDist));
});     
            
gulp.task('desktop', ['desktop-scripts', 'desktop-styles', 'desktop-static', 'desktop-configuration']);
gulp.task('web', ['web-scripts', 'web-styles', 'web-static']);
gulp.task('default', ['desktop', 'web']);