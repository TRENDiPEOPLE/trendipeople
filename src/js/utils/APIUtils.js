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
  fetchUser : fetchUser,
  rate      : rate
};
