/** @jsx React.DOM */
(function(){

  var Dispatcher      = require('../dispatcher.js');
  var CategoryStore   = require('../stores/categorystore.js');
  var ModalView       = require('./modal.jsx');

  NewItemView = React.createClass({
    getDefaultProps : function(){
      var itemData   = this.props.itemData;
      var itemTitle, itemUrl, itemDescription, catId, itemCid;

      if(itemData){
        itemTitle       = itemData.get('title');
        itemUrl         = itemData.get('url');
        itemDescription = itemData.get('description');
        catId           = itemData.get('catId');
        itemCid         = itemData.cid;
      }

      return {
        itemTitle         : itemTitle,
        itemUrl           : itemUrl,
        itemDescription   : itemDescription,
        catId             : catId || 0,
        categories        : CategoryStore.models,
        itemCid           : itemCid
      }

    },
    render : function(){
      var categories = [];

      for (var i = this.props.categories.length - 1; i >= 0; i--) {
        var model     = this.props.categories[i];
        categories.push(
          <option key={'option-'+i} value={model.get('catId')}>
            {model.get('catName')}
          </option>
        );
      };

      var confirmButton;

      if(this.props.itemData){
        confirmButton = <button type='submit' onClick={this.confirm} className='confirm'><i className='icon-ok-circled'/>Save item</button>;
      } else {
        confirmButton = <button type='submit' onClick={this.confirm} className='confirm'><i className='icon-plus-circled'/>Add item</button>;
      }

      return (
        <ModalView type='item-form' cancelHandler={this.cancel} title={this.props.title}>
          <input
            type         = 'text'
            ref          = 'itemTitle'
            onKeyUp      = {this.handleKey}
            defaultValue = {this.props.itemTitle}
            placeholder  = 'Item Title' />

          <input
            type         = 'text'
            ref          = 'itemUrl'
            onKeyUp      = {this.handleKey}
            defaultValue = {this.props.itemUrl}
            placeholder  = 'Url' />

          <textarea
            onKeyUp      = {this.handleKey}
            ref          = 'itemDescription'
            placeholder  = 'Item Description'
            defaultValue = {this.props.itemDescription} />

          <select ref='itemCategory' defaultValue={this.props.catId}>
            <option value='0'>Uncategorized</option>
            {categories}
          </select>

          {confirmButton}
          <a href='#' onClick={this.cancel} className='cancel'>Cancel</a>
        </ModalView>
      )
    },
    handleKey : function(e){
      if(e.key == 'Enter'){
        this.confirm();
      }
    },
    confirm : function(){
      var itemTitle         = this.refs.itemTitle.state.value;
      var itemUrl           = this.refs.itemUrl.state.value;
      var itemCategory      = this.refs.itemCategory.state.value || 0;
      var itemDescription   = this.refs.itemDescription.state.value;
      var itemCid           = this.props.itemCid;

      data = {
        title       : itemTitle,
        catId       : itemCategory,
        description : itemDescription,
        url         : itemUrl,
        cid         : itemCid
      }

      Dispatcher.dispatch('items:save', data);
      Dispatcher.dispatch('actions:close', {
        type : 'newItem'
      });
    },
    cancel : function(e){
      e.preventDefault();
      Dispatcher.dispatch('actions:close', {
        type : 'newItem'
      });
    }
  });

  module.exports = NewItemView;

}).call(this);