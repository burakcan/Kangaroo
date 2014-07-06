/** @jsx React.DOM */
(function(){

  var SidebarView     = require('./sidebar.jsx');
  var TopbarView      = require('./topbar.jsx');
  var ContentAreaView = require('./contentarea.jsx');
  var CategoryFormView = require('./categoryform.jsx');
  var ItemFormView    = require('./itemform.jsx');
  var ItemStore       = require('../stores/itemstore.js');
  var CategoryStore   = require('../stores/categorystore.js');
  var ActionStore     = require('../stores/actionstore.js');

  var getState = function(){
    return {
      items           : ItemStore.models,
      itemCount       : ItemStore.models.length,
      itemStoreState  : ItemStore.state,
      categories      : CategoryStore.models,
      catId           : CategoryStore.catId,
      actions         : ActionStore.actions
    }
  }

  AppView = React.createClass({
    getDefaultProps : function(){
      return {
        getItem       : ItemStore.get
      }
    },
    getInitialState: function(){
      return getState();
    },
    componentWillMount: function(){
      var self = this;

      var refreshState = function(){
        var state = getState();
        self.setState(state)
      };

      var events = 'change reset add remove'

      ItemStore.on(events, refreshState);
      CategoryStore.on(events, refreshState);
      ActionStore.on('action', refreshState);
    },
    render : function(){
      var actions = [];

      for (var i = this.state.actions.length - 1; i >= 0; i--) {
        switch(this.state.actions[i].type){
          case 'newCategory':
            actions.push(<CategoryFormView key={"action-" + i} />);
            break;

          case 'newItem' :
            actions.push(<ItemFormView title='Add new item' key={"action-" + i} />);
            break;

          case 'editItem' :
            var itemData = this.state.actions[i].itemData;
            actions.push(<ItemFormView title='Edit item' itemData={itemData} key={"action-" + i} />);
            break;

          case 'editCategory' :
            var categoryData = this.state.actions[i].categoryData;
            actions.push(<CategoryFormView title='Edit category' categoryData={categoryData} key={"action-" + i} />);
            break;

        }
      };

      return (
        <main className="app-view">
          <SidebarView categories={this.state.categories} catId={this.state.catId} />
          <TopbarView />
          {actions}
          <ContentAreaView items={this.state.items} itemStoreState={this.state.itemStoreState} itemCount={this.state.itemCount} />
        </main>
      )
    }
  });

  module.exports = AppView;

}).call(this);