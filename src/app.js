(function(){

  var AppView     = require('./views/app.jsx');
  var Dispatcher  = require('./dispatcher.js');
  var Router      = Backbone.Router.extend({
    routes : {
      ""                          : "category",
      "#"                         : "category",
      "category/:cat_id"          : "category"
    }
  });

  var router = new Router();

  var _APP = window._APP = {
    catId   : 0,
    router  : router
  }

  router.on('route:category', function(catId){
    _APP.catId  = catId || 0;
    Dispatcher.dispatch('categories:select', _APP.catId);
  });

  router.once('route', function(){
    React.renderComponent(AppView({
      router        : router
    }), document.body );
  });

  Backbone.history.start();

}).call(this);