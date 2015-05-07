var React = require("react");
var ActionCreators = require('../actions/ActionCreators');



var Upload = React.createClass({

	handleSubmit: function(e){
		var image = React.findDOMNode(this.refs.image).value;
		console.log('image: ', image)
		var user_id = this.props.user.facebook_id;
		e.preventDefault();
		var data = {
			image: image,
			user_id: user_id
		}
		ActionCreators.saveImage(data);
	},

	render: function(){
		var user_id = this.props.user.facebook_id;
		console.log('user_id: ', user_id);
		var image_api_url = '/users/' + user_id + '/image';
		return (

			<form method="POST"	action={image_api_url}  onSubmit={this.handleSubmit}>
				<input type="text" />
  				<input type="file" name="pic" ref="image" accept="image/*" />
				<input type="submit" value="Share image" />
			</form>

			)
	}
});

module.exports = Upload;