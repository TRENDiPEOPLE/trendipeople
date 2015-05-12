var React = require("react");

var CategoryBox = React.createClass({
    render: function() {

      var categories = this.props.categories.map(function(ele, index) {
        return <li className="boxList" key={ele + index}> {ele} </li>;
      });
        return(
          <div>
            <h5 className="boxTitle">Categories</h5>
            <hr className="boxLine" />
            {categories}
          </div>
        );
    }
});


module.exports = CategoryBox;

