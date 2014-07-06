/** @jsx React.DOM */
(function(){
  var Dispatcher      = require('../dispatcher.js');

  ItemView = React.createClass({
    render : function(){
      return (
        <article>
        		<h2><a target='_BLANK' href={this.props.itemData.get('url')} className="title">{this.props.itemData.get('title')}</a></h2>
        		<p>
        			{this.props.itemData.get('description')}
        		</p>
            <footer>
              <button className='edit' onClick={this.showEditForm}>Edit</button>
              <button className='delete' onClick={this.delete}>Delete</button>
            </footer>
        </article>
      )
    },
    delete : function(e){
      e.preventDefault();
      Dispatcher.dispatch('items:delete', this.props.itemData.id);
    },
    showEditForm : function(e){
      e.preventDefault();
      Dispatcher.dispatch('actions:open', {
        type      : 'editItem',
        itemData  : this.props.itemData,
        lock      : true
      });
    }
  });

  module.exports = ItemView;

}).call(this);