'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './lib/**/*.js'],
  watch: ['./gulpfile.js', './lib/**', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: {
    <% if (answers.publicApp || answers.privateApp) { %>
    api: ['./test/api/**/*.js', '!test/{temp,tmp,fixtures}/**}'],
    <% } %>
    unit: ['./test/unit/**/*.js', '!test/{temp,tmp,fixtures}/**}'],
    integration: ['./test/integration/**/*.js', '!test/{temp,tmp,fixtures}/**}']
  },
  source: ['./lib/**/*.js']
};

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .pipe(plugins.istanbul.hookRequire())
    .on('finish', cb);
});

gulp.task('istanbul:report', ['test:integration'], function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests run
    .on('end', function () {
      process.chdir(__dirname);
      process.exit();
      cb();
    });
});

gulp.task('test:config', ['istanbul'], function () {
  if (process.argv.indexOf('--config') === -1) {
    process.argv = process.argv.concat([
      '--config',
      './test/fixtures/config.json'
    ]);
  }
});
<% if (answers.publicApp || answers.privateApp) { %>
gulp.task('test:api', ['test:config'], function (cb) {
  gulp.src(paths.tests.api)
    .pipe(plugins.plumber())
    .pipe(plugins.mocha())
    .on('end', cb);
});
<% } %>

gulp.task('test:unit', <% if (answers.publicApp || answers.privateApp) { %>['test:api'], <% } %>function (cb) {
  gulp.src(paths.tests.unit)
    .pipe(plugins.plumber())
    .pipe(plugins.mocha())
    .on('end', cb);
});

gulp.task('test:integration', ['test:unit'], function (cb) {
  gulp.src(paths.tests.integration)
    .pipe(plugins.plumber())
    .pipe(plugins.mocha())
    .on('end', cb);
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint',
  'istanbul',
  'test:config',
  <% if (answers.publicApp || answers.privateApp) { %>
  'test:api',
  <% } %>
  'test:unit',
  'test:integration',
  'istanbul:report'
]);

gulp.task('default', ['test']);
