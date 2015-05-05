var Request = require('superagent');
var ServerActionCreators = require('../actions/ServerActionCreators');

module.exports = {
	fetchUser: function(){
		Request.get('/user')
			.end(function(err,res){
				console.log('AJAX response: ', res);
				ServerActionCreators.receivedUser(res.body);
			});
	}
}