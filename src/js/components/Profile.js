var React = require("react");
var ActionCreators = require('../actions/ActionCreators');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var Profile = React.createClass({

	clickHander: function(){
		// testing the flux structure with a random click handler
		var data = 'some random data';
		ActionCreators.rate(data);
	},

	render: function(){
		console.log('render profile');
		// the users info is stored in this.props.user
		var username = this.props.user.username;
		var facebook_id = this.props.user.facebook_id;
		var profile_image_url = 'https://graph.facebook.com/' + facebook_id + '/picture';
		var images = this.props.user.shared_images;
		console.log('images: ', images);
		imagesHTML = images.map(function(image){
			return (<img key={image._id} src={image.link}  />)
		});

		return (
			<div>
				<img src={profile_image_url} />
				<p>{username}</p>
				<p><Link to="upload">Upload image</Link></p>
				{imagesHTML}
			</div>
		);
	}
});

module.exports = Profile;