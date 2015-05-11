var React = require("react");
var ActionCreators = require("../actions/ActionCreators");

var TrendingPeople = React.createClass({

    clickHandler: function(rating,_id) {
      var voter_id = this.props.user.facebook_id;
      var data = {
        image_id: _id,
        voter_id: voter_id,
        rating: rating
      };
      ActionCreators.rate(data);
    },

    componentWillMount: function(){
      ActionCreators.fetchTrendingImages();
    },

    render: function() {
      var images = this.props.trendingImages || [];
      var trendiLogo = "/public/assets/images/logo-small.png";
      var that = this;

      // create the HTML for all the images
      if (images.length > 0){
            var imagesHTML = images.map(function(image, index){
            var id = Math.floor(Math.random()*1000);
            var count = 1;
            var rating = [];

            // create the trendi rating below each image
            while (count<=5){
              var rateClick = that.clickHandler.bind(null, count, image._id);
              rating.push(<img key={Math.random()} src={trendiLogo} onClick={rateClick} />);
              count +=1;
            }

            return (
               <div key={id} className="imageBox">
                <img src={image.link} />
                 {rating} {image.rating}
                </div>
              );
        });
      }

      return (
            <div>
              <h5> Trending People </h5>
                <div>
                  {imagesHTML}
              </div>
            </div>
      );
    }
});



module.exports = TrendingPeople;

