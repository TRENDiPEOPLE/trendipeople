var mongoose = require('mongoose');
var Path = require('path');
var index = Path.resolve(__dirname + '/../public/index.html');

var config = require('./config');
var Schema = mongoose.Schema;

var User = require('./schema').User;
var Img = require('./schema').Img;
// local mongoose connection
//mongoose.connect('mongodb://127.0.0.1:27017/test');

// mongolab mongoose connection
mongoose.connect(config.db.dburl);
var db = mongoose.connection;

db.once('open', function(callback){
	console.log('db connected');
});

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
		var facebook_id = request.auth.credentials.auth_id;

		User.findOne({email: email}, function(err,user){
		    if (err){
		        throw err;
		    }

		    if (user){
		    	console.log('user exists');
		    	console.log(user);
				reply.file(index);
		    }

		    else {
		    	console.log('trying to save new user, with all info');
				var new_user = new User();
                new_user.email = email;
                new_user.username = username;
                new_user.facebook_id = facebook_id;
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
    // if user is authenticated
	if (request.auth.isAuthenticated){
    	var email = request.auth.credentials.email;

	    // query the db for the user
		User.findOne({email: email}, function(err,user){

		    if (err){
	       		console.log(err);
            throw err;
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

    // if the user isn't authenticated
	} else {
		console.log('request.auth.credentials: ', request.auth.credentials);
		reply('youre not authenticated');
	}
};

var publicProfile = function(request,reply){
	var id = request.params.userid;
	console.log('id: ', id);
	
	User.findOne({facebook_id: id}, function(err,user){
			if (err){
	       		console.log(err);
            throw err;
		    }
	        // if the user is registered
			if (user){
	    		console.log('Fund user ', user);
				Img.find({facebook_id: id}, function(err,images){
					if (err){
		       			throw err;
		       			console.log(err);	
			    	}
		    		var publicProfile = {
		    			user: user,
		    			images: images
		    		}
			    	if (images){
			    		console.log('users images: ', images);
			    		reply(publicProfile)
			    	}
			    	else if (!images){
			    		console.log('no user images')
			    		reply(publicProfile)
			    	}
			    });
	        // if the user isn't registered
			} else if (!user){
				console.log('couldnt find user');
			}

	});

	console.log('id: ', id);
	reply(id);
};

var trending = function(request,reply){
	console.log('api/user/images handler triggered')
	if (request.auth.isAuthenticated){
		Img.find({},function(err,images){
			if (err){
	   			throw err;
	   			console.log(err);	
	    	}

	    	if (images){
	    		trending_images = images.filter(function(image){
	    			return (image.rating > 3)
	    		});
	    		console.log('trending_images: ', trending_images);
	    		reply(trending_images)
	    	}
	    	else if (!images){
	    		console.log('no images')
	    		reply([]);
	    	}
		});
	}

};




var image = function(request,reply){
	console.log('api/user/images handler triggered')
	if (request.auth.isAuthenticated){
		if (request.raw.req.method === 'POST'){
			var id = request.params.id;		
			var email = request.auth.credentials.email;
			var facebook_id = request.auth.credentials.auth_id;
			console.log('facebook_id: ', facebook_id);
			var payload = request.payload;
			var image_link = payload.image;
			console.log('payload: ',request.payload);

			var new_image = new Img();
			new_image.link = image_link;
			new_image.rating = 4;
			new_image.raters = [];
			new_image.facebook_id = facebook_id;
	        new_image.save( function(err){
	            if (err){
	                console.log('error when saving new member');
	                throw error;
	            }
	            console.log('registration successful');
	            reply('success');
	        });

		} 
		else if (request.raw.req.method === 'GET'){
			var facebook_id = request.auth.credentials.auth_id;

			Img.find({facebook_id: facebook_id}, function(err,images){
				if (err){
	       			throw err;
	       			console.log(err);	
		    	}

		    	if (images){
		    		console.log('users images: ', images);
		    		reply(images)
		    	}
		    	else if (!images){
		    		console.log('no user images')
		    		reply([]);
		    	}

			});

		}


	} else {
		reply('not authenticated');
	}

};


var facebook = function (request, reply) {
	console.log('facebook handler');
    var creds = request.auth.credentials;

    console.log('facebook handler trigged');
    console.log('creds.profile.d: ', creds.profile.displayName);
    var profile = {
        username    : creds.profile.displayName,
        auth_method : 'facebook',
        auth_id     : creds.profile.raw.id,
        email       : creds.profile.email
    };

    request.auth.session.set(profile);
    reply.redirect('/');
};

var rate = function(request, reply) {
	reply('hello')
};

module.exports = {
	facebook: facebook,
	home: home,
	logout: logout,
	image:image,
	user: user,
	rate: rate,
	trending: trending,
	publicProfile: publicProfile
};
