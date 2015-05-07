var React = require("react");

var CategoryBox = React.createClass({
    render: function() {

      var categories = this.props.categories.map(function(ele, index) {
        return <li key={ele + index}> {ele} </li>;
      });
        return(
          <div>
            <h5>Categories</h5>
            {categories}
          </div>
        );
    }
});


module.exports = CategoryBox;

