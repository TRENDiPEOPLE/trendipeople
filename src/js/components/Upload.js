var React = require("react");
var Request = require("superagent");

var ActionCreators = require('../actions/ActionCreators');

var Upload = React.createClass({

	handleChange: function() {
		$("#shareID").show();
		console.log("changes happening");
	},

	render: function(){
		console.log('this.props: ',this.props);
		console.log('rendering Upload');
		var image_api_url = './api/image';
		console.log('image_api_url: ', image_api_url);
		return (

				<div className="modal fade" id="myModal">
				  <div className="modal-dialog">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
				        <h4 className="modal-title">Start a global fashion trend</h4>
				      </div>
				      <div className="modal-body">
							<form action="/api/user/images" method="POST" encType="multipart/form-data" id="dog" ref="upload">
						  				<input type="file" name="image_link" ref="image" onChange={this.handleChange} accept="image/png, image/jpeg"/>
										<input type="submit" value="Share image" id="shareID"/>
									</form>
				        <p></p>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
		);


	}

});

module.exports = Upload;
