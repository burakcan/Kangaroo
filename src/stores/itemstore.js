(function(){

  Dispatcher = require('../dispatcher.js');

  var searchIndex = lunr(function () {
    this.field('title')
    this.field('description')
    this.field('url')
    this.ref('cid')
  });

  var ItemModel = Backbone.Model.extend({
    defaults : {
      catId  : '0'
    }
  });

  var ItemCollection = Backbone.Collection.extend({
    initialize    : function(initialItems, options){
      options               = options || {};
      this.localStorage     = options.localStorage || false;

      if (options.localStorage){
        this.fetch();

        for (var i = this.models.length - 1; i >= 0; i--) {
          var data = _.clone(this.models[i].attributes);
          data.cid = this.models[i].cid;
          searchIndex.add(data);
        };
      }

      Dispatcher.subscribe('categories:delete', function(topic, catId){
        var items   = this.where({ catId : catId.toString() });
        items.map(function(item){
          item.set('catId', '0');

          if (item.get('persist')){
            item.save();
          }
        });
      }, this);

      Dispatcher.subscribe('items:save', function(topic, data){
        var item;

        data.persist = (data.persist === null || data.persist === undefined) ? true : data.persist;

        if(data.cid){
          item = this.get(data.cid);
          delete data['cid'];
          item.set(data);
        }else{
          delete data['cid'];
          item = new ItemModel(data);
          this.add(item);
        }

        if (options.localStorage){
          if (data.persist) {
            item.save();
          };

          data.cid = item.cid;
          searchIndex.add(data);
        }

        Dispatcher.dispatch('categories:select', _APP.catId);

      }, this);

      Dispatcher.subscribe('items:delete', function(topic, cid){
        var item = this.get(cid);
        if(item){ item.destroy(); }
      }, this);

    },
    model : ItemModel
  });

  var AllItems = new ItemCollection(false,{ localStorage : new Backbone.LocalStorage("ItemCollection") });
  var ItemStore = new ItemCollection();

  Dispatcher.subscribe(['categories:select', 'items:search'], function(topic, catId){ //When searching catId is searchTerm
    var models = AllItems.models;
    var searchResults = [];
    var searchTerm    = null;
    this.state        = topic;

    switch(topic){
      case 'items:search':
        searchTerm    = catId;
        catId         = _APP.catId;
        searchResults = searchIndex.search(searchTerm);
        break;
    }

    if (catId != "0"){
      models = AllItems.where({catId : catId});
    }

    if (topic == 'items:search' && searchResults.length > 0) {
      _models = [];
      searchResults.forEach(function(result){
        var ref = result.ref;
        resultModel = AllItems.get(ref);
        if (resultModel.get('catId') == _APP.catId || _APP.catId == '0') {
          _models.push(resultModel);
        };
      });
      models = _models;
    } else if(topic == 'items:search' && (!searchTerm || searchTerm == '')){
      Dispatcher.dispatch('categories:select', catId);
    } else if(topic == 'items:search') {
      models = [];
    };

    this.reset(models);
  }, ItemStore);

  module.exports = ItemStore;

}).call(this);