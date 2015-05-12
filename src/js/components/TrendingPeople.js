var React = require("react");

var TrendingPeople = React.createClass({
    render: function() {

      var people = this.props.people.map(function(ele, index) {
        return (
          <div className="col-md-3 peopleBox">
           <img src={ele.img} key={Math.random()} className="image" />
          </div>
        );
      });
        return(
          <div>
            <h5 id="trendingLooks"> TREND<strong>i</strong>NG PEOPLE </h5>
            {people}
            <hr id="line" />
          </div>
        );
    }
});


module.exports = TrendingPeople;

