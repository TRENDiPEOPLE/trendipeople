var React = require("react");
var ActionCreators = require('../actions/ActionCreators');

var Profile = React.createClass({

	clickHander: function(){
		// testing the flux structure with a random click handler
		var data = 'some random data';
	},

	render: function(){
		return (
			<div className="col-md-2">
				<p>Profile page</p>
				<input type="submit" onClick={this.clickHander} value="Rate!"/>
			</div>
		);
	}
});

module.exports = Profile;
