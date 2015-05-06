var React = require("react");
var TrendBox = require("./TrendBox");
var TrendingPeople = require("./TrendingPeople");

var Trending = React.createClass({
	render: function(){
		return (
			<div>
        <div className="col-md-2 col-sm-4 col-lg-2 col-xs-4">
          <TrendBox />
        </div>
        <div className="col-md-10 col-sm-8 col-lg-10 col-xs-8">
          <TrendingPeople />
        </div>
			</div>
			);
	}
});

module.exports = Trending;
