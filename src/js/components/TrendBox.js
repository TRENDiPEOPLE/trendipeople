var React = require("react");

var TrendBox = React.createClass({
    render: function() {

      var trendTopics = this.props.trends.map(function(ele, index) {
        return <li key={ele + index} >{ele}</li>;
      });
        return(
          <div>
            <h5>What's Hot Worldwide</h5>
              <ul>
                {trendTopics}
              </ul>
          </div>
        );
    }
});


module.exports = TrendBox;