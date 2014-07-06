/** @jsx React.DOM */
(function(){

  var CategoryItemView = require('./categoryitem.jsx');
  var Dispatcher       = require('../dispatcher.js');

  CategoryListView = React.createClass({
    render : function(){
      var categories = [];

      for (var key in this.props.categories){
        var className = (this.props.catId == this.props.categories[key].get("catId")) ? 'active' : ''

        categories.push(<CategoryItemView key={key} categoryData={this.props.categories[key]} className={className} />)
      }

      return (
        <nav className="category-list">
          <ul>
            <li><a href="#" className="category-item">All Bookmarks</a></li>
            {categories}
            <button className='new-category' onClick={this.showNewCategoryForm}>New category</button>
          </ul>
        </nav>
      )
    },
    showNewCategoryForm : function(e){
      e.preventDefault();
      Dispatcher.dispatch('actions:open', {
        type : 'newCategory',
        lock : true
      });
    }
  });

  module.exports = CategoryListView;

}).call(this);