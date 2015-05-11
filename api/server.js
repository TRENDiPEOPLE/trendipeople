var Hapi = require("hapi");
var server = new Hapi.Server();
var Path = require('path');
var index = Path.resolve(__dirname + '/../public/index.html');
var Bell = require('bell');
var Cookie = require('hapi-auth-cookie');
var Joi = require('joi');
var handler = require('./handler');
var config = require('./config');

server.connection({
	host: "localhost",
	port:  process.env.PORT || 8080
});

server.register([require('bell'), require('hapi-auth-cookie')] , function(err){

	if (err){
		throw err;
	}

	server.auth.strategy('facebook', 'bell', {
		provider	: 'facebook',
        password    : config.facebook.clientSecret,
        clientId    : config.facebook.clientId,
        clientSecret: config.facebook.clientSecret,
        isSecure    : false
	});

	server.auth.strategy('session', 'cookie', {
        password        : config.cookie.password,
        cookie          : 'sid',
        isSecure        : false
    });

	server.route([{
		path: '/',
		method: 'GET',
		config: {
			auth: {
				strategy: 'session',
				mode: 'try'
			},
			handler: handler.home,
      	plugins: {
        'hapi-auth-cookie': {
            reddirectTo: '/'
        	 }
       	}
		}
	},

  {

		path: '/api/trending/images',
		method: 'GET',
		config: {

			 //for image uploading
			 /*payload: {
	           output:'file',
	           maxBytes:209715200,
	           parse: false
	        },*/

			auth: {
				strategy: 'session',
				mode: 'try'
			},
			handler: handler.trending,

            plugins: {
                'hapi-auth-cookie': {
                    reddirectTo: '/'
                }
            }
		}
	}, {
		path: '/api/user/images',
		method: ['POST'],
		config: {

			 //for image uploading
			 payload: {
	   //         output:'file',
	   //         maxBytes:209715200,
	   //         parse: false
	        },

			auth: {
				strategy: 'session',
				mode: 'try'
			},
			handler: handler.image,

            plugins: {
                'hapi-auth-cookie': {
                    reddirectTo: '/'
                }
            }
		}
	},

	{
		path: '/api/user',
		method: 'GET',
		config: {
			auth: {
				strategy: 'session',
				mode: 'try'
			},
			handler: handler.user,
	        plugins: {
	          'hapi-auth-cookie': {
	             reddirectTo: '/'
	           }
      		}
		}
		},{
	    path: "/api/rate",
	    method: "POST",
	    config: {
	      auth: {
	        strategy: "session",
	        mode: "optional"
	      },
	      handler: handler.rate
	    }
	},{
	    path: '/logout',
	    method: 'GET',
	    config: {
	        auth: {
	          strategy: 'session',
	          mode: 'try'
	       	},
	        handler: handler.logout
	      }
	},{
		//Facebook login route
	   method  : ['GET', 'POST'],
	   path    : '/facebook',
	   config  : {
	   auth: 'facebook',
	     handler: handler.facebook
	    }
	},{

		path: "/public/{param*}",
		method: "GET",
		handler: {
			directory:{
				path: Path.resolve(__dirname + '/../public'),
				index: true
			}
		}
	},{
		path: '/{subpage}',
		method: 'GET',
		config: {
			auth: {
				strategy: 'session',
				mode: 'try'
			},
			handler: handler.home,
      	plugins: {
        'hapi-auth-cookie': {
            reddirectTo: '/'
        	}
       	}
		}
	}
]);

});

module.exports = server;
