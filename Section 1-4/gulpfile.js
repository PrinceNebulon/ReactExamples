var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require ('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var superagent = require('superagent');

gulp.task('default', function() {
	var bundler = watchify(browserify({
		entries: ['./src/app.jsx'],
		transform: [reactify],
		extensions: ['.jsx'],
		debug: true,
		cache: {},
		packageCache: {},
		fullPaths: true
	}));

	var message = 'Thinking about building...';

	function build(file) {
		gutil.log('**** Recompiling ' + file);

		// Get a new message for next time
		superagent
			.get('http://api.icndb.com/jokes/random')
			.end(function(err, res) {
				message = res.body.value.joke;
			});

		// Log the message
		gutil.log(message);

		// Do the build
		var result = bundler
			.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify error'))
			.pipe(source('main.js'))
			.pipe(gulp.dest('./'));
		gutil.log('Build complete');

		// Return result
		return result;
	}

	build();
	bundler.on('update', build);
});