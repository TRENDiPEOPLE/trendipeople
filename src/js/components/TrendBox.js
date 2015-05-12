var React = require("react");

var TrendBox = React.createClass({
    render: function() {

      var trendTopics = this.props.trends.map(function(ele, index) {
        return <li key={ele + index} >{ele}</li>;
      });
        return(
          <div>
            <h5 className="boxTitle">Worldwide Trends</h5>
              <hr className="boxLine"/>
              <ul className="boxList">
                {trendTopics}
              </ul>
          </div>
        );
    }
});


module.exports = TrendBox;
