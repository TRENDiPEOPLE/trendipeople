var React = require("react");
var Request = require("superagent");

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
	getInitialState: function() {
		return {data_uri: null};
	},

	handleSubmit: function(e){
		e.preventDefault();
		var image = React.findDOMNode(this.refs.image).value;

		if (image.length < 1){
			image = 'http://lorempixel.com/150/150/people/';
		}

		var formData = new FormData(image);

		console.log('image: ', image, formData);
/*		if (image.length < 1){
			image = 'http://lorempixel.com/150/150/people/';
		}
		ActionCreators.saveImage(formData);
	},
*/
	render: function(){
		console.log('this.props: ',this.props);
		console.log('rendering Upload');
		var image_api_url = './api/image';
		console.log('image_api_url: ', image_api_url);
		return (

			<form action="/api/user/images" method="POST" encType="multipart/form-data" id="dog" ref="upload">
  				<input type="file" name="image_link" ref="image" accept="image/png, image/jpeg"/>
				<input type="submit" value="Share image" id="submitID"/>
			</form>
		);


	}

});

module.exports = Upload;
