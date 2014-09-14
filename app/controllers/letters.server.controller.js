'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Letter = mongoose.model('Letter'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Letter already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Letter
 */
exports.create = function(req, res) {
	var letter = new Letter(req.body);
	letter.user = req.user;

	letter.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(letter);
		}
	});
};

/**
 * Show the current Letter
 */
exports.read = function(req, res) {
	res.jsonp(req.letter);
};

/**
 * Update a Letter
 */
exports.update = function(req, res) {
	var letter = req.letter ;

	letter = _.extend(letter , req.body);

	letter.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(letter);
		}
	});
};

/**
 * Delete an Letter
 */
exports.delete = function(req, res) {
	var letter = req.letter ;

	letter.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(letter);
		}
	});
};

/**
 * List of Letters
 */
exports.list = function(req, res) { Letter.find().sort('-created').populate('user', 'displayName').exec(function(err, letters) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(letters);
		}
	});
};

/**
 * Letter middleware
 */
exports.letterByID = function(req, res, next, id) { Letter.findById(id).populate('user', 'displayName').exec(function(err, letter) {
		if (err) return next(err);
		if (! letter) return next(new Error('Failed to load Letter ' + id));
		req.letter = letter ;
		next();
	});
};

/**
 * Letter authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.letter.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};