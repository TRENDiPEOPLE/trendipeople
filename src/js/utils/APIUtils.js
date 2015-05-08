var Request = require('superagent');
var ServerActionCreators = require('../actions/ServerActionCreators');


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

