React = require("react");
var ActionCreators = require('../actions/ActionCreators');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var User = React.createClass({

	componentWillMount: function(){
		var facebook_id = this.props.user.facebook_id;
		ActionCreators.fetchPublicProfile(facebook_id);
	},

	render: function(){
		var params = this.props.params;
		console.log

/*		var username = this.props.user.username;
		var facebook_id = this.props.user.facebook_id;
		var profile_image_url = 'https://graph.facebook.com/' + facebook_id + '/picture';
		var images = this.props.userImages;
		
		if (images === undefined){
			images = [];
		}

		console.log('images: ', images);
		imagesHTML = images.map(function(image){
			return (<img key={image._id} src={image.link}  />)
		});

		return (
			<div className="col-md-2">
				<p>{username}</p>
				<img src={profile_image_url} />
				{imagesHTML}
			</div>
		);*/

	return(
		<div>
		{params}
		</div>)
	}
});

module.exports = User;
