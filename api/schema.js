var mongoose = require('mongoose');
var crate = require('mongoose-crate');
var S3 = require('mongoose-crate-s3');

var userSchema = new mongoose.Schema({
	username: String,
	email: String
});

var User = mongoose.model('User', userSchema);

var imageSchema = new mongoose.Schema({
	imageId: String,
	userId: String,
	ratingTotal: Number,
	ratingCount: Number
});

var Images = mongoose.model('Images', imageSchema);

module.exports = {
	User: User,
	Images: Images
};