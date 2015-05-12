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
var Upload = require('./Upload');
var User = require('./User');
var ActionCreators = require('../actions/ActionCreators');

function getStateFromStore(){
	var rating 		 = Store.getRating();
	var user   		 = Store.getUser();
	var people 		 = Store.getPeople();
	var trends 		 = Store.getTrends();
	var looks  		 = Store.getLooks();
	var userImages 		 = Store.getUserImages();
	var categories   = Store.getCategories();
	var trendingImages = Store.getTrendingImages();
	
	return {
		rating 		 : rating,
		user   		 : user,
		people 		 : people,
		trends 		 : trends,
		looks  		 : looks,
		categories   : categories,
		userImages 		 : userImages,
		trendingImages: trendingImages
	};

}

var TrendiPeople = React.createClass({

	getInitialState: function(){
		return getStateFromStore();
	},

	componentWillMount: function(){
		// console.log('componentDidMount');
		Store.addChangeListener(this._onChange);
		// console.log('going to ActionCreators to fetch user');
		ActionCreators.fetchUser();
	},

	componentWillUnmount: function(){
        Store.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState(getStateFromStore());
	},

	render: function(){

		//console.log('userImages in TrendiPeople: ', this.state.userImages);
		//console.log('trendingImages in TrendiPeople: ', this.state.trendingImages);
		var menu;

		// display login or logout if the user is logged in or out
		if (this.state.user) {
			menu = <ul className="nav navbar-nav">
				<li><Link to="profile">Profile</Link></li>
				<li><Link to="trending">Trending</Link></li>
				<li><Link to="upload">Upload</Link></li>
				 <li><a href="/logout">Log out</a></li>
			</ul>;

		} else {
			menu =<ul className="nav navbar-nav"> <li><a href="/facebook">Login</a></li></ul>;
		}

		var rating = this.state.rating;
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
					    <img src="/public/assets/images/logo.png" id="logo"/>
					    <p> TRENDiPEOPLE© </p>
							<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button"></div>
							<nav className="navbar navbar-default">
								<div className="container-fluid">
								    <div className="navbar-header">
								    	<Link to="home" className="navbar-brand">Home</Link>
								    </div>
								    <div>
								    {menu}
									</div>
								</div>
							</nav>
						</div>
					</div>

					<div className="row col-md-12">
						<RouteHandler 	rating={this.state.rating}
										userImages={this.state.userImages}
										user={this.state.user}
										people={this.state.people}
										trends={this.state.trends}
										looks={this.state.looks}
										categories={this.state.categories}
										trendingImages={this.state.trendingImages} />
					</div>
				</div>
			</div>
		);
	}
});


var routes = (
	<Route name="home" path="/" handler={TrendiPeople} >
		<Route name="profile" handler={Profile} />
		<Route path="users">
			<Route path="/:userId" handler={User} />
		</Route>
		<Route name="trending" handler={Trending} />
		<Route name="upload" handler={Upload} />
		<DefaultRoute handler={Trending} />
	</Route>
);

// Add Router.HistoryLocation to remove the urgy hash from the URL, but then the dynamic urls dont work...
Router.run(routes, function(Handler){
    React.render(<Handler/>, document.body);
});

module.exports = TrendiPeople;
