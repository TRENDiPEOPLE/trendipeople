var React = require("react");

var TrendingPeople = React.createClass({
    render: function() {

      var trendiLogo = "./assets/images/logo-small.png";

      var trendingPeople = this.props.people.map(function(image, index) {
        return <div className="imageBox">
            <img src={image.img} key={Math.random()} />
            <img src={trendiLogo} /><img src={trendiLogo} /><img src={trendiLogo} /><img src={trendiLogo} /><img src={trendiLogo} />
          </div>;
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

