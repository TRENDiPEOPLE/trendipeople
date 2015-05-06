var React = require("react");
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;
var TrendiPeople = require('./TrendiPeople')
var Profile = require('./Profile');
var Trending = require('./Trending');

var Body = React.createClass({
	render: function(){
		return(
			<div>
			</div>
		)
	}
});

module.exports = Body;