var React = require('react');


var User = React.createClass({

	componentWillMount: function(){
		
	},

	render: function(){
		var params = this.props.params;
		console.log('params: ', params);
		return (
			<div>User</div>
			)
	}
})

module.exports = User;