(function(){

  var Dispatcher = require('../dispatcher.js');

  var CategoryModel = Backbone.Model.extend({
    defaults : {
      catId   : '0',
      catName : 'All Bookmarks'
    }
  });

  var CategoryCollection = Backbone.Collection.extend({
    initialize : function(){
      this.fetch();

      Dispatcher.subscribe('categories:select', function(topic, catId){
        this.catId = catId;
        this.reset(this.models);
        if(catId != _APP.catId){
          _APP.router.navigate('category/' + catId);
        }
      }, this);

      Dispatcher.subscribe('categories:delete', function(topic, catId){
        var category   = this.findWhere({catId:catId});
        category.destroy();
      }, this);

      Dispatcher.subscribe('categories:save', function(topic, data){
        var category;

        data.persist = (data.persist === null || data.persist === undefined) ? true : data.persist;

        if(data.cid){
          category = this.get(data.cid);
          delete data['cid'];
          category.set(data);
        }else{
          delete data['cid'];

          lastByCatId = this.max(function(model){
            return model.get('catId');
          });

          var lastCatId = 0;

          if (lastByCatId instanceof Object) {
            lastCatId = lastByCatId.get('catId');
          };

          data.catId = lastCatId + 1;

          category = new CategoryModel(data);
          this.add(category);
        }
        if (data.persist) {
            category.save();
          };
      }, this);
    },
    model : CategoryModel,
    localStorage : new Backbone.LocalStorage("CategoryCollection")
  });

  var CategoryStore   = new CategoryCollection();

  module.exports = CategoryStore;

}).call(this);