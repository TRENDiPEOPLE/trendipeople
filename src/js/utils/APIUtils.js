var Request = require('superagent');
var ServerActionCreators = require('../actions/ServerActionCreators');

module.exports = {

	fetchUser: function(){
		Request.get('/user')
			.end(function(err,res){
				console.log('AJAX response: ', res);
				ServerActionCreators.receivedUser(res.body);
			});
	},

	fetchImages: function(id){
		Request.get('/api/image')
			.end(function(err,res){
				console.log('AJAX response: ', res);
				ServerActionCreators.receivedImages(res.body);
			});
	},


	saveImage: function(data){
		console.log('sending ajax request. data: ', data);
		Request.post('/api/image')
			.send(data)
			.end(function(err,res) {
				console.log('AJAX response: ', res);
				ServerActionCreators.receivedImage(res.text);
			});
	}
}