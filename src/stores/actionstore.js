(function(){

  var Publisher  = require('../publisher.js');
  var Dispatcher = require('../dispatcher.js');

  var ActionsStore      = new Publisher;
  ActionsStore.on       = Publisher.prototype.subscribe;
  ActionsStore.actions  = [];
  ActionsStore.lockeds  = []

  Dispatcher.subscribe('actions:open', function(topic, action){
    this.actions.push(action);
    this.dispatch('action');
  }, ActionsStore);

  Dispatcher.subscribe('actions:close', function(topic, action){
    var index = this.actions.indexOf(action);
    this.actions.splice(index, 1);

    this.dispatch('action');
  }, ActionsStore)

  module.exports = ActionsStore;

}).call(this);