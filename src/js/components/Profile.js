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
		console.log("people props", this.props.people);
		// the users info is stored in this.props.user
		var username = this.props.user.username;
		var facebook_id = this.props.user.facebook_id;
		var profile_image_url = 'https://graph.facebook.com/' + facebook_id + '/picture';


		var people = this.props.people.map(function(ele, index) {
        return (
          <div className="col-md-3 peopleBox">
           <img src={ele.img} key={Math.random()} className="image" />
          </div>
        );
      });

		return (
			<div>
				<div className="profileRow col-md-8 col-md-offset-2">
					<div className="">
						<img src={profile_image_url} id="profilePic"/>
						<p id="userName">{username}</p>
					</div>
					<div className="infoBar">
						<div className="infoBox">Followers: 25
						</div>
						<div className="infoBox">Following: 12
						</div>
						<div className="infoBox">Ratings: 35
						</div>
						<div className="infoBox">Average TrendiRating:
						</div>
					</div>
				</div>
				<div className="wardrobeRow col-md-12">
						{people}
				</div>
			</div>
		);
	}
});

module.exports = Profile;
