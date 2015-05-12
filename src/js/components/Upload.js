var React = require("react");
var $ = require('jquery');
var ActionCreators = require('../actions/ActionCreators');



var Upload = React.createClass({
/*
	componentDidMount: function(){
		$("#submitID").click(function(){
    		var formData = new FormData($('#dog')[0]);

    		
		});
	},
*/
/*
	handleSubmit: function(e){
		e.preventDefault();
		var image = React.findDOMNode(this.refs.image).files[0];

		var formData = new FormData(image);

		console.log('image: ', image, formData);	
/*		if (image.length < 1){ 
			image = 'http://lorempixel.com/150/150/people/';
		}
		ActionCreators.saveImage(formData);
	},
*/
	render: function(){

		var image_api_url = './api/image';
		console.log('image_api_url: ', image_api_url);
		return (
			<div>
			<img src="https://trendipeople.s3-eu-west-1.amazonaws.com/1431455398699-25124-79e76f238f16b75f" />
			<form onSubmit={this.handleSubmit} action="/api/user/images" method="POST" encType="multipart/form-data" id="dog" ref="upload">
  				<input type="file" name="image_link" ref="image" accept="image/png, image/jpeg"/>
				<input type="submit" value="Share image" id="submitID"/>
			</form>
			</div>
		)

		
	}

});

module.exports = Upload;