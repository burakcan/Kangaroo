/** @jsx React.DOM */
(function(){

  var CategoryListView = require('./categorylist.jsx')

  SidebarView = React.createClass({
    render : function(){
      return (
        <aside>
          <CategoryListView categories={this.props.categories} catId={this.props.catId} />
        </aside>
      )
    }
  });

  module.exports = SidebarView;

}).call(this);