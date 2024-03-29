'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Question name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    recipient: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        default: '',
        required: 'Please fill body.'
    }
});

mongoose.model('Question', QuestionSchema);