var mongoose = require('mongoose');
var crate = require('mongoose-crate');
var S3 = require('mongoose-crate-s3');

var userSchema = new mongoose.Schema({
	username: String,
	email: String
});

var User = mongoose.model('User', userSchema);

var imageSchema = new mongoose.Schema({
	imageId: String, //Id for images
	userId: String, //Facebook id
	ratingTotal: Number, //Total rating score, e.g 4 + 3 + 2 = 9
	ratingCount: Number //Total number of ratings, e.g. 3 => 9/3 = 3 (average)
});

// imageSchema.plugin(crate, {
//   storage: new S3({
//     key: '<api-key-here>',
//     secret: '<secret-here>',
//     bucket: '<bucket-here>',
//     acl: '<acl-here>', // defaults to public-read
//     region: '<region-here>', // defaults to us-standard
//     path: function(attachment) { // where the file is stored in the bucket - defaults to this function
//       return '/' + path.basename(attachment.path)
//     }
//   }),
//   fields: {
//     file: {}
//   }
// });

var Images = mongoose.model('Images', imageSchema);

module.exports = {
	User: User,
	Images: Images
};