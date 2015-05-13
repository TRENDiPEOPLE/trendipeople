var React = require("react");
var TrendBox = require("./TrendBox");
var CategoryBox = require("./CategoryBox");
var TrendingPeople = require("./TrendingPeople");
var TrendingLooks = require("./TrendingLooks");

var Trending = React.createClass({
	render: function(){
		return (
			<div>
        <div className="trendingPeople col-md-12 col-sm-8 col-lg-10 col-xs-8">
          <TrendingPeople user={this.props.user} people={this.props.people} rating={this.props.rating} />
        </div>
        <div className="trendingLooks col-md-12 col-sm-8 col-lg-9 col-xs-8">
          <TrendingLooks user={this.props.user} looks={this.props.looks} trendingImages={this.props.trendingImages} />
        </div>
      </div>
      );
  }
});

module.exports = Trending;

        // <div className="trendBox col-md-3">
        //   <TrendBox trends={this.props.trends} />
        // </div>
