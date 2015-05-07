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
	console.log('user handler triggered');
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


var rate = function(request, reply) {
  console.log("rate handler");
};


var image = function(request,reply){
	console.log('image handler triggered');
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
		    		reply(images)
		    	}
		    	else if (!images){
		    		reply([]);
		    	}

			});

		}
		//var payload= request.payload;
		//var payloadPath = request.payload.path;
		//var image = fs.readFileSync(payloadPath);




/*
		User.findOne({email: email}, function(err,user){

		    if (err){
	       		throw err;
	       		console.log(err);
		    }

	        // if the user is registered
			if (user){
				var new_image = {
					link: image_link,
					title: 'some title'
				}
				user.shared_images.push(new_image);

				user.markModified('shared_images');

                //save the updated
                user.save(function(err){
                    if (err){
                    console.log('Error is : ', err);
                    }
                });
				reply(user);

	        // if the user isn't registered
			} else if (!user){
				console.log('couldnt find user');
			}

		});

*/


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

module.exports = {
	facebook: facebook,
	home: home,
	logout: logout,
	user: user,
  rate: rate,
	image:image,
};
