var React = require("react");
var ActionCreators = require('../actions/ActionCreators');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var Profile = React.createClass({

	componentWillMount: function(){
		var facebook_id = this.props.user.facebook_id;
		ActionCreators.fetchUserImages(facebook_id);
	},

	render: function(){
		// the users info is stored in this.props.user
		var username = this.props.user.username;
		var facebook_id = this.props.user.facebook_id;
		var profile_image_url = 'https://graph.facebook.com/' + facebook_id + '/picture';
		var images = this.props.userImages;

		if (images === undefined){
			images = [];
		}

		imagesHTML = images.map(function(image){
			return (<img key={image._id} src={image.link} className="wardrobeImage col-md-2" />);
		});

		return (
			<div>
				<div className="row profileRow col-md-12">
					<div className="profileBox col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4">
						<img src={profile_image_url} id="profilePic" />
						<p id="userName">{username}</p>
						<p> London, UK</p>
					</div>
					<div className="infoBar col-md-12">
						<div className="infoBox">Followers:
						</div>
						<div className="infoBox">Following:
						</div>
						<div className="infoBox">Ratings:
						</div>
						<div className="infoBox">Trends:
						</div>
					</div>
				</div>
				<div className="row wardrobeRow col-md-12">
						{imagesHTML}
				</div>
			</div>
		);
	}
});

module.exports = Profile;
