var React 			 = require("react");
var Router 			 = require('react-router'); // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link 				 = Router.Link;
var RouteHandler = Router.RouteHandler;
var Route 			 = Router.Route;

//var ActionCreators = require('../actions/ActionCreators');
var Store 				 = require('../stores/Store');
var Profile 			 = require('./Profile');
var Body 					 = require('./Body');
var Trending 			 = require('./Trending');
var Upload 			 	 = require('./Upload');
var User 					 = require('./User');
var ActionCreators = require('../actions/ActionCreators');

function getStateFromStore(){

	var rating 		 			= Store.getRating();
	var user   		 			= Store.getUser();
	var trendingPeople 	= Store.getTrendingPeople();
	var trends 		 			= Store.getTrends();
	var looks  		 			= Store.getLooks();
	var userImages 	 		= Store.getUserImages();
	var categories   		= Store.getCategories();
	var trendingImages 	= Store.getTrendingImages();
	var publicProfile 	= Store.getPublicProfile();

	return {
		rating 		  		: rating,
		user   		  		: user,
		trendingPeople	: trendingPeople,
		trends 		 			: trends,
		looks  		 			: looks,
		categories   		: categories,
		userImages 		  : userImages,
		trendingImages 	: trendingImages,
		publicProfile 	: publicProfile
	};
}

var TrendiPeople = React.createClass({

	getInitialState: function(){
		return getStateFromStore();
	},

	componentWillMount: function(){
		// console.log('componentDidMount');
		Store.addChangeListener(this._onChange);
		console.log('going to ActionCreators to fetch user');
		ActionCreators.fetchUser();
	},

	componentWillUnmount: function(){
        Store.removeChangeListener(this._onChange);
	},

	_onChange: function(){
		this.setState(getStateFromStore());
	},


		/*				<nav className="navbar navbar-default">
						  <div className="container-fluid">
						    <div className="navbar-header">
						      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						        <span className="sr-only">Toggle navigation</span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						        <span className="icon-bar"></span>
						      </button>
						      <a className="navbar-brand" href="#">Brand</a>
						    </div>

						    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						      <ul className="nav navbar-nav">
						        <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
						        <li><a href="#">Link</a></li>
						        <li className="dropdown">
						          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
						          <ul className="dropdown-menu" role="menu">
						            <li><a href="#">Action</a></li>
						            <li><a href="#">Another action</a></li>
						            <li><a href="#">Something else here</a></li>
						            <li className="divider"></li>
						            <li><a href="#">Separated link</a></li>
						            <li className="divider"></li>
						            <li><a href="#">One more separated link</a></li>
						          </ul>
						        </li>
						      </ul>
						    </div>
						  </div>
						</nav>*/





	render: function(){

		//console.log('trendingImages in TrendiPeople: ', this.state.trendingImages);
		var menu;

		// display login or logout if the user is logged in or out
		if (this.state.user) {
			menu = 	<ul className="nav nav-tabs nav-justified">
						<li><Link to="home" className="menu_text" >HOME</Link></li>
						<li><Link to="profile" className="menu_text" id="profilenav">MY WARDROBE</Link></li>
						<li><Link to="trending" className="menu_text">TRENDING</Link></li>
						<li><a href="/logout" className="menu_text">LOG OUT</a></li>
					</ul>;

		} else {
			menu = 	<ul className="nav nav-tabs nav-justified">
						<li><Link to="home" className="menu_text" >Home</Link></li>
						<li><a href="/facebook" className="menu_text">Login</a></li>
					</ul>;
		}

		var rating = this.state.rating;
		return(
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
		    			<div id="topBox">
				    	<Link to="home"><img src="/public/assets/images/trendi.png" id="logo"/></Link>
			    			<div id="social_icons">
								<div className="fb-share-button" data-href="https://trendipeople1.herokuapp.com" data-layout="button">
								</div>

								<a href="https://twitter.com/share" className="twitter-share-button" data-url="http://trendipeople.com" data-text="Check out the latest fashion trends at trendipeople.com" data-hashtags="trendipeople">Tweet</a>
							</div>
						</div>
						<nav className="navbar navbar-default">
						<div className="container-fluid">
						    <div>
								{menu}
							</div>
						</div>
						</nav>
					</div>
				</div>
				
			<RouteHandler rating={this.state.rating}
						publicProfile={this.state.publicProfile}
						userImages={this.state.userImages}
						user={this.state.user}
						trendingPeople={this.state.trendingPeople}
						trends={this.state.trends}
						looks={this.state.looks}
						categories={this.state.categories}
						trendingImages={this.state.trendingImages} />
		</div>
	</div>
		);
	}
});


var routes = (
	<Route name="home" path="/" handler={TrendiPeople} >
		<Route name="upload" handler={Upload} />
		<Route name="profile" handler={Profile} />
		<Route name="trending" handler={Trending} />
		<Route name=":user" handler={User} />
		<DefaultRoute handler={Trending} />
	</Route>
);

// Add Router.HistoryLocation to remove the urgy hash from the URL, but then the dynamic urls dont work...
Router.run(routes, function(Handler){
    React.render(<Handler/>, document.body);
});

module.exports = TrendiPeople;
