var React = require("react");
var ActionCreators = require("../actions/ActionCreators");

var TrendingPeople = React.createClass({

    clickHandler: function(rating,_id) {
      console.log('id: ',_id)
      var voter_id = this.props.user.facebook_id;
      var data = {
        image_id: _id,
        voter_id: voter_id,
        rating: rating
      }
      ActionCreators.rate(data);
    },

    componentWillMount: function(){
      ActionCreators.fetchTrendingImages();
    },

    render: function() {
      var images = this.props.trendingImages || [];
      var trendiLogo = "/public/assets/images/logo-small.png";
      var that = this;

      if (images !== undefined){
          var imagesHTML = images.map(function(image){
          var id = Math.floor(Math.random()*1000);
          var count = 1;
          var rating = [];

          while (count<=5){
            var rateClick = that.clickHandler.bind(null, count, image._id);
            rating.push(<img key={Math.random()} src={trendiLogo} onClick={rateClick} />)
            count +=1
          }

          return (
             <div key={id} className="imageBox">
              <img src={image.link} />
               {rating} {image.rating}
              </div>
            );
        });        
      }
      


      console.log('imagesHTML: ', imagesHTML);
      return (
            <div>
              <h5> Trending People </h5>
                <div>
                  {imagesHTML}
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

