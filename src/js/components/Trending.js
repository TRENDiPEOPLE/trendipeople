var React = require("react");
var TrendBox = require("./TrendBox");
var CategoryBox = require("./CategoryBox");
var TrendingPeople = require("./TrendingPeople");
var TrendingLooks = require("./TrendingLooks");

var Trending = React.createClass({
	render: function(){
		return (
			<div>
        <div className="trendBox ps-top-to-bottom col-md-2 col-sm-4 col-lg-2 col-xs-4">
          <TrendBox trends={this.props.trends} />
        </div>
        <div className="trendingPeople col-md-10 col-sm-8 col-lg-10 col-xs-8">
          <TrendingPeople people={this.props.people} images={this.props.images} rating={this.props.rating} />
        </div>
        <div className="categoryBox ps-top-to-bottom col-md-2 col-sm-4 col-lg-2 col-xs-4">
          <CategoryBox categories={this.props.categories} />
        </div>
        <div className="trendingLooks col-md-10 col-sm-8 col-lg-10 col-xs-8">
          <TrendingLooks looks={this.props.looks} />
        </div>
			</div>
			);
	}
});

module.exports = Trending;
