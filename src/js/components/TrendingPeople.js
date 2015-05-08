var React = require("react");
var ActionCreators = require("../actions/ActionCreators");

var TrendingPeople = React.createClass({

    clickHandler: function() {
      ActionCreators.rate({ id: "user1", img: "pic1"});
    },

    render: function() {
      var images = this.props.images;
      console.log('images: ', images);
      console.log('this.props: ', this.props);
      var trendiLogo = "./assets/images/logo-small.png";

      if (images === undefined){
        images = [];
      }
      var that = this;
      var images = images.map(function(image){
        var id = Math.floor(Math.random()*1000);
        return (
            <img src={image.link} key={id} onClick={that.clickHandler} />
          );
      });

      console.log('images: ', images);
      return (
            <div>
              <h5> Trending People </h5>
                <div  className="imageBox">
                  {images}
              </div>
            </div>
      )
    }
});

/*
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
*/




module.exports = TrendingPeople;

