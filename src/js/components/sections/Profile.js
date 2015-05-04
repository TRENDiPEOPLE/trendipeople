var React = require("react");
var ActionCreators = require('../../actions/ActionCreators');

var Profile = React.createClass({

	clickHander: function(){
		var data = 'some random data';
		ActionCreators.rate(data);
	},

	render: function(){
		return (
			<div>
				<p>Increment rating</p>
				<input type="submit" onClick={this.clickHander} value="Rate!"/>
			</div>
		)
	}
});

module.exports = Profile;