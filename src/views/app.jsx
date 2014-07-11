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
  var FirstLaunchView = require('./firstlaunch.jsx');
  var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        getItem       : ItemStore.get,
        firstLaunch   : localStorage._appFirstLaunch || true
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

      if (this.props.firstLaunch != 'no') {
        localStorage._appFirstLaunch = 'no';
        Dispatcher.dispatch('actions:open',{
          type : 'firstLaunch'
        });
      }

    },
    getActions : function(){
      var actions = [];

      for (var i = this.state.actions.length - 1; i >= 0; i--) {
        switch(this.state.actions[i].type){
          case 'newCategory':
            actions.push(<CategoryFormView title='Add new category' key={"action-" + i} />);
            break;

          case 'newItem' :
            actions.push(<ItemFormView title='Add new bookmark' key={"action-" + i} />);
            break;

          case 'editItem' :
            var itemData = this.state.actions[i].itemData;
            actions.push(<ItemFormView title='Edit bookmark' itemData={itemData} key={"action-" + i} />);
            break;

          case 'editCategory' :
            var categoryData = this.state.actions[i].categoryData;
            actions.push(<CategoryFormView title='Edit category' categoryData={categoryData} key={"action-" + i} />);
            break;

          case 'firstLaunch' :
            actions.push(<FirstLaunchView title='Welcome to Kangaroo!' key={"action-" + i} />);
            break;

        }
      }

      return actions;
    },
    render : function(){
      var actions = this.getActions();

      return (
        <main className="app-view">
          <SidebarView categories={this.state.categories} catId={this.state.catId} />
          <TopbarView />
          <ReactCSSTransitionGroup transitionName='action'>
          {actions}
          </ReactCSSTransitionGroup>
          <ContentAreaView items={this.state.items} itemStoreState={this.state.itemStoreState} itemCount={this.state.itemCount} />
        </main>
      )
    }
  });

  module.exports = AppView;

}).call(this);