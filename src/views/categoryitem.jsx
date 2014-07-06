/** @jsx React.DOM */
(function(){

  CategoryItemView = React.createClass({
    render : function(){
      {
        var href = '#category/' + this.props.categoryData.get('catId');
        var className = 'category-item ' + this.props.className;
      }
      return (
        <li>
          <a href={href} className={className}>{this.props.categoryData.get('catName')}</a>
          <button className='edit' onClick={this.showEditForm}>Edit</button>
          <button className='delete' onClick={this.delete}>Delete</button>
        </li>
      )
    },
    delete : function(){
      Dispatcher.dispatch('categories:delete', this.props.categoryData.get('catId'));
      if(this.props.categoryData.get('catId') == _APP.catId){
        Dispatcher.dispatch('categories:select', 0);
      }
    },
    showEditForm : function(e){
      e.preventDefault();
      Dispatcher.dispatch('actions:open', {
        type          : 'editCategory',
        categoryData  : this.props.categoryData,
        lock          : true
      });
    }
  });

  module.exports = CategoryItemView;

}).call(this);