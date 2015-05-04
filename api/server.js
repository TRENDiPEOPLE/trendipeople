var Hapi = require('hapi');
var server = new Hapi.Server();
var Path = require('path');
var index = Path.resolve(__dirname + '/../public/index.html');

server.connection({
	host: 'localhost',
	port:  process.env.PORT || 8080
});

server.route([{
	path: "/",
	method: "GET",
	handler: function(request,reply){
		reply.file(index);
	}
},{
	path: "/{param*}",
	method: "GET",
	handler: {
		directory:{
			path: Path.resolve(__dirname + '/../public'),
			index: true
		}
	}

}]);


module.exports = server;