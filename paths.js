var paths = {};

paths.baseDir = "./Content/",
paths.distDir = paths.baseDir + "dist/",
paths.distFilePattern = "**/*.*",
paths.scssDir = paths.baseDir + "scss/",
paths.scssTestDir = paths.baseDir + "scss-test/",
paths.scssFilesGlob = [paths.scssDir + "**/*.scss"],
paths.jsDir = paths.baseDir + "js/",
paths.scriptsFilesGlob = [paths.jsDir + "**/*.js", paths.jsDir + "admin/**/*.js"]

module.exports = paths;
