var React = require("react");
var ActionCreators = require("../actions/ActionCreators");

var TrendingLooks = React.createClass({

    clickHandler: function(rating,_id) {
      console.log('rateclick: ', rating);
      var voter_id = this.props.user.facebook_id;
      var data = {
        userImages: null,
        trendingImages: this.props.trendingImages,
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
      var trendiLogo = "/public/assets/images/logo-round.png";
      var that = this;

      // create the HTML for all the images
      if (images.length > 0){
            var imagesHTML = images.map(function(image, index){
            var id = Math.floor(Math.random()*1000);
            var count = 1;
            var rating = [];
            var hidden = "";

            // create the trendi rating below each image
            while (count<=5){
              var rateClick = that.clickHandler.bind(null, count, image._id);
              if (image.rating < count) hidden = "inactive";
              rating.push(<img key={Math.random()} className={"rating " + hidden} src={trendiLogo} onClick={rateClick} />);
              count +=1;
            }

            return (
               <div key={image.file.url} className="imageBox col-md-4">
                <img src={image.file.url} className="image"/>
                 <div className="ratingLogo">{rating}</div>
                </div>
              );
        });
      }

      return (
            <div>
              <h5 id="trendingPeople"> TREND<strong>i</strong>NG FASHION LOOKS </h5>
                <div>
                  {imagesHTML}
              </div>
            </div>
      );
    }
});



module.exports = TrendingLooks;

