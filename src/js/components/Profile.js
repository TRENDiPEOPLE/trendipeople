var React = require("react");
var ActionCreators = require('../actions/ActionCreators');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var Link = Router.Link;

var Profile = React.createClass({

	componentWillMount: function(){
		console.log('this.props: ', this.props);
		//var facebook_id = this.props.user.facebook_id;
		//ActionCreators.fetchUserImages(facebook_id);
	},

	render: function(){

		var facebook_id = "";
		var username = "";
		var profile_image_url = "";
		var images = [];
		// the users info is stored in this.props.user
		console.log('this.props.user: ', this.props.user);
		if (this.props.user !== null){
			username = this.props.user.username;
			facebook_id = this.props.user.facebook_id || "";
			profile_image_url = 'https://graph.facebook.com/' + facebook_id + '/picture';
			images = this.props.userImages || [];
		}

	    var trendiLogo = "/public/assets/images/logo-small.png";
	    var that = this;

	    // create the HTML for all the images
	    if (images.length > 0){
	          var imagesHTML = images.map(function(image, index){
	          var count = 1;
	          var rating = [];
	          var hidden = "";

	          // create the trendi rating below each image
	          while (count<=5){
	            if (image.rating < count) hidden = "inactive";
	            rating.push(<img key={Math.random()} className={"rating " + hidden} src={trendiLogo} />);
	            count +=1;
	          }

          return (
             <div key={image.file.url} className="imageBox col-md-3">
              <img src={image.file.url} className="image"/>
               <div className="ratingLogo">{rating}</div>
              </div>
            );
      });
    }

		return (
			<div>
				<div className="profileRow col-md-8 col-md-offset-2">
					<div>
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
						{imagesHTML}
				</div>
			</div>
		);
	}
});

module.exports = Profile;
