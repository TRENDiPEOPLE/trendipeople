var React = require("react");
var Request = require("superagent");

var ActionCreators = require('../actions/ActionCreators');



var Upload = React.createClass({

	getInitialState: function() {
		return {data_uri: null};
	},

	// handleSubmit: function(e){
	// 	e.preventDefault();
	// 	var image = React.findDOMNode(this.refs.image).value;

	// 	if (image.length < 1){
	// 		image = 'http://lorempixel.com/200/200/sports/DummyText/';
	// 	}

	// 	var data = {
	// 		image: image
	// 	};
	// 	ActionCreators.saveImage(data);
	// },

	// render: function(){

	// 	var image_api_url = './api/image';
	// 	console.log('image_api_url: ', image_api_url);
	// 	return (

	// 		<form onSubmit={this.handleSubmit} >
 //  				<input type="file" name="image_link" ref="image" />
	// 			<input type="submit" value="Share image" />
	// 		</form>
	// 	);


	// }

	handleSubmit: function(e){
		e.preventDefault();

		Request.post("/api/user/images")
					.send({data : this.state.data_uri})
					.end(function(err, res) {
						if (err) console.log("err: ", err);
						console.log("superagent success: ", res);
					});
					// console.log(this.state.data_uri);
	},

	handleFile: function(e) {
		var reader = new FileReader();
		var file = e.target.files[0];

		reader.onload = function(upload) {
			this.setState({
				data_uri: upload.target.result
			});
			// console.log(this.state.data_uri);
		}.bind(this);

		reader.readAsText(file);
	},

	render: function(){

		return (
			<form onSubmit={this.handleSubmit} encyType="multipart/form-data" >
  				<input type="file" onChange={this.handleFile} name="image" ref="image" />
				<input type="submit" value="Save image" />
			</form>
		);


	}

});

module.exports = Upload;
