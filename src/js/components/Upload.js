var React = require("react");
var ActionCreators = require('../actions/ActionCreators');



var Upload = React.createClass({

	handleSubmit: function(e){
		e.preventDefault();
		var image = React.findDOMNode(this.refs.image).value;
		
		if (image.length < 1){ 
			image = 'http://lorempixel.com/200/200/sports/DummyText/';
		}

		var data = {
			image: image
		};
		ActionCreators.saveImage(data);
	},

	render: function(){

		var image_api_url = './api/image';
		console.log('image_api_url: ', image_api_url);
		return (

			<form method="POST" action="/api/image"  onSubmit={this.handleSubmit} >
  			
  				<input type="text" name="image_link" ref="image" />
				<input type="submit" value="Share image" />
			
			</form>

			)
	}
});

module.exports = Upload;