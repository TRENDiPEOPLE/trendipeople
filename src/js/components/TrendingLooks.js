var React = require("react");

var TrendingLooks = React.createClass({
    render: function() {

      var looks = this.props.looks.map(function(ele, index) {
        return <img  src={ele.look} key={Math.random()} className="lookBox" />;
      });
        return(
          <div>
            <h5> Trending Looks </h5>
            {looks}
          </div>
        );
    }
});


module.exports = TrendingLooks;

