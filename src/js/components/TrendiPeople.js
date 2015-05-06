var React = require("react");
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Route = Router.Route;

//var ActionCreators = require('../actions/ActionCreators');
var Store = require('../stores/Store');
var Profile = require('./Profile');
var Body = require('./Body');
var Trending = require('./Trending');

var ActionCreators = require('../actions/ActionCreators')

function getStateFromStore(){
	var rating = Store.getRating();
	var user = Store.getUser();
	return {
		rating : rating,
		user : user
	}


}

var TrendiPeople = React.createClass({

	getInitialState: function(){
		return getStateFromStore();
	},

	componentWillMount: function(){
		console.log('componentDidMount');
		Store.addChangeListener(this._onChange);
		console.log('going to ActionCreators to fetch user')
		ActionCreators.fetchUser();
	},

	componentWillUnmount: function(){
        Store.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState(getStateFromStore());
	},

	render: function(){

		var email;

		// display login or logout if the user is logged in or out
		if (this.state.user) {
			loginButton = <li><a href="/logout">Log out</a></li>;
			email = this.state.user.email;
		} else {
			loginButton = <li><a href="/facebook">Login</a></li>;
		}

		var rating = this.state.rating;
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<nav className="navbar navbar-default">
								<div className="container-fluid">
								    <div className="navbar-header">
								    	<Link to="trendipeople" className="navbar-brand">TRENDiPEOPLE</Link>
								    </div>
								    <div>
										<ul className="nav navbar-nav">
											{email}
											<li><Link to="profile">Profile</Link></li>
											<li><Link to="trending">Trending</Link></li>
											{loginButton}
										</ul>
									</div>
								</div>
							</nav>
						</div>
					</div>
					<RouteHandler rating={this.state.rating} user={this.state.user}/>
				</div>
			</div>
		);
	}
});


var routes = (
	<Route name="trendipeople" path="/" handler={TrendiPeople} >
		<Route name="profile" handler={Profile} />
		<Route name="trending" handler={Trending} />
		<DefaultRoute handler={Trending} />
	</Route>
);

// Add Router.HistoryLocation to remove the urgy hash from the URL, but then the dynamic urls dont work...
Router.run(routes, Router.HistoryLocation, function(Handler){
    React.render(<Handler/>, document.body);
});

module.exports = TrendiPeople;