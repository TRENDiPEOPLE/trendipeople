var React = require("react");

var TrendBox = React.createClass({
    render: function() {
      console.log(this.props);

      var trendTopics = this.props.trends.map(function(ele, index) {
        return <li key={ele + index} >{ele}</li>;
      });
        return(
          <div>
            <h5>Hot Worldwide</h5>
              <ul>
                {trendTopics}
              </ul>
          </div>
        );
    }
});


module.exports = TrendBox;
