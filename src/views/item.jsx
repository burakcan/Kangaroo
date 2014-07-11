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
              <button className='delete' onClick={this.delete}><i className='icon-cancel'/></button>
              <button className='edit' onClick={this.showEditForm}><i className='icon-pencil'/></button>
            </footer>
        </article>
      )
    },
    delete : function(e){
      e.preventDefault();
      Dispatcher.dispatch('items:delete', this.props.itemData.cid);
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