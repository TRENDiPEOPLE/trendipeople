var mongoose = require('mongoose');
var Path = require('path');
var index = Path.resolve(__dirname + '/../public/index.html');
var bson = require('bson');

// local mongoose connection
//mongoose.connect('mongodb://127.0.0.1:27017/test');

// mongolab mongoose connection
mongoose.connect('mongodb://trendipeople:trendipeople@ds034348.mongolab.com:34348/trendipeople');
var db = mongoose.connection;

db.once('open', function(callback){
	console.log('db connected')
});

var userSchema = new mongoose.Schema({
	username: String,
	email: String
});

var User = mongoose.model('User', userSchema)

var logout = function(request,reply){
	if (request.auth.isAuthenticated) {
        console.log('is authenticated, so logging out!');
        request.auth.session.clear();
        reply.redirect('/');
    } else {
        reply.redirect('/');
    }
};

var home = function(request,reply){
	if (request.auth.isAuthenticated){
		console.log('is authenticated');		

		var email = request.auth.credentials.email;
		var username = request.auth.credentials.username;

		User.findOne({email: email}, function(err,user){
		    if (err){
		        throw err;
		    }

		    if (user){
		    	console.log('user exists');
		    	console.log(user)
				reply.file(index);
		    }

		    else {
		    	console.log('trying to save new user');
				var new_user = new User();
                new_user.email = email;
                new_user.username = username;

                new_user.save( function(err){
                    if (err){
                        console.log('error when saving new member');
                        throw error;
                    }
                    console.log('registration successful');
                    reply.file(index);
                });
		    
		    }

		});

	} else {
		console.log('not authenticated');
		reply.file(index);
	}
};

var user = function(request,reply){
	console.log('user handler triggered');
    // if user is authenticated
	if (request.auth.isAuthenticated){
    	var email = request.auth.credentials.email;

	    // query the db for the user
		User.findOne({email: email}, function(err,user){
		    
		    if (err){
	       		throw err;
	       		console.log(err);	
		    }

	        // if the user is registered
			if (user){ 
	    		console.log('user is: ', user);
				reply(user);

	        // if the user isn't registered
			} else if (!user){
				console.log('couldnt find user');
			}

		});

    // if the user isnt authenticated
	} else {
		console.log('request.auth.credentials: ', request.auth.credentials);
		reply('youre not authenticated');
	}
};


var facebook = function (request, reply) {
    var creds = request.auth.credentials;
    
    console.log('creds.profile.d: ', creds.profile.displayName);
    var profile = {
        username    : creds.profile.displayName,
        auth_method : 'facebook',
        auth_id     : creds.profile.raw.id,
        email       : creds.profile.email
    }

    request.auth.session.set(profile);
    reply.redirect('/');     
};

module.exports = {
	facebook: facebook,
	home: home,
	logout: logout,
	user: user
}