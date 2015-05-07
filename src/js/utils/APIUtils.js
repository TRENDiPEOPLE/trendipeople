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

	saveImage: function(data){
		console.log('sending ajax request');
		Request.post('/users/' + data.user_id + '/image')
			.send(data)
			.end(function(err,res){
				console.log('AJAX response: ', res);
				ServerActionCreators.receivedImage(res.text);
			});
	}
}