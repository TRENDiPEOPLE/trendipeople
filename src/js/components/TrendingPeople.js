var React = require("react");
var ActionCreators = require("../actions/ActionCreators");

var TrendingPeople = React.createClass({

    clickHandler: function() {
      ActionCreators.rate({ id: "user1", img: "pic1"});
    },

    render: function() {

      var trendiLogo = "./assets/images/logo-small.png";

      var trendingPeople = this.props.people.map(function(image, index) {
        return <div key={Math.random()} className="imageBox">
                <img src={image.img}  />
                <img src={trendiLogo} onClick={this.clickHandler} />
                <img src={trendiLogo} onClick={this.clickHandler} />
                <img src={trendiLogo} onClick={this.clickHandler} />
                <img src={trendiLogo} onClick={this.clickHandler} />
                <img src={trendiLogo} onClick={this.clickHandler} />
                {this.props.rating}
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

