var Request = require('superagent');
var ServerActionCreators = require('../actions/ServerActionCreators');

/*
function fetchUser(){
	Request.get('/user')
		.end(function(err,res){
			// console.log('AJAX response: ', res);
			ServerActionCreators.receivedUser(res.body);
	   });
}

function rate(data) {
  console.log("api utils: ", data);
  Request.post("/api/rate")
        .end(function(err, res){
          // console.log("data: ", data);
          if(err) console.log("err: ", err);
          console.log("rating action created: ", res);
          ServerActionCreators.rate(res);
        });
}


*/


module.exports = {

	rate: function(data){
		console.log('RATE API utils')
		Request.post('/api/rate')
			.send(data)
			.end(function(err,res){
				console.log('AJAX response rate: ', res);
				ServerActionCreators.receivedRating(res.body)
			});
	},

	fetchUser: function(){
		Request.get('/api/user')
			.end(function(err,res){
				console.log('AJAX response fetchUser: ', res);
				ServerActionCreators.receivedUser(res.body);
			});
	},

	fetchUserImages: function(id){
		Request.get('/api/user/images')
			.end(function(err,res){
				console.log('AJAX response fetchUserImages: ', res);
				ServerActionCreators.receivedUserImages(res.body);
			});
	},

	fetchTrendingImages: function(){
		Request.get('/api/trending/images')
			.end(function(err,res){
				console.log('AJAX response fetchTrendingImages: ', res);
				ServerActionCreators.receivedTrendingImages(res.body);
			});		
	},


	saveImage: function(data){
		Request.post('/api/user/images')
			.send(data)
			.end(function(err,res) {
				console.log('AJAX response saveImage: ', res);
				ServerActionCreators.receivedImages(res.text);
			});
	}
}

