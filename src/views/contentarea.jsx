/** @jsx React.DOM */
(function(){

  var ItemView        = require('./item.jsx');
  var CategoryStore   = require('../stores/categorystore.js');
  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

  ContentAreaView = React.createClass({
    statics : {
      noSearchResultMsg : 'No search result found',
      noItemFoundMsg : 'There are no items in this category'
    },
    render : function(){
      var items = this.props.items;
      var views = [];

      for (var key in items){
        views.push(<ItemView key={key} itemData={items[key]} />)
      }

      if(this.props.itemCount == 0){
        var errMsg;
        switch(this.props.itemStoreState){
          case 'items:search':
            errMsg = ContentAreaView.noSearchResultMsg;
            break;

          case 'categories:select' :
            errMsg = ContentAreaView.noItemFoundMsg;
            break;
        }
        views.push(<div key='errmsg' className='errmsg'>{errMsg}</div>)
      }

      return (
        <ReactCSSTransitionGroup
          component={React.DOM.div}
          className="content-area"
          transitionName='item'>

          {views}

        </ReactCSSTransitionGroup>
      )
    }
  });

  module.exports = ContentAreaView;

}).call(this);