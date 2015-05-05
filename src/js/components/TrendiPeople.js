var React = require("react");
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;

//var ActionCreators = require('../actions/ActionCreators');
var Store = require('../stores/Store');
var Profile = require('./sections/Profile');

function getStateFromStore(){
	var rating = Store.getRating();

	return {
		rating : rating
	};

}

var TrendiPeople = React.createClass({

	getInitialState: function(){
		return getStateFromStore();
	},

	componentDidMount: function(){
		Store.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
        Store.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState(getStateFromStore());
	},

	render: function(){
		var rating = this.state.rating;
		return(
			<div>
				<Profile />
				Rating: {rating}
			</div>

			);
	}
});


module.exports = TrendiPeople;
