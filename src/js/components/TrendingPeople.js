var React = require("react");

var TrendingPeople = React.createClass({
    render: function() {

      var trendingPeople = this.props.people.map(function(image, index) {
        return <img src={image.img} key={Math.random()} className="imageBox"/>;
      }.bind(this));
        return(
          <div>
            <h5> Trending People </h5>
            {trendingPeople}
          </div>
        );
    }
});


module.exports = TrendingPeople;

