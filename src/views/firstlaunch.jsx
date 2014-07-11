/** @jsx React.DOM */
(function(){

  var ModalView = require('./modal.jsx');

  FirstLaunchView = React.createClass({
    render : function(){
      return (
        <ModalView cancelHandler={this.cancel} type='first-launch-modal' title={this.props.title}>

          <p>
            <strong>Kangaroo</strong> is a simple bookmarks app which you can simply keep your bookmarks, categorized. <br />
            If you want to see how this shit works, i can load some example bookmarks for you. <br />
            Don't worry that example data will not be persistent. At any time, you can refresh and they're gone... <br />
          </p>

          <button type='submit' onClick={this.confirm} className='confirm'><i className='icon-ok-circled'/>Load example data</button>

            <a href='#' onClick={this.cancel} className='cancel'>No, give me a blank canvas!</a>
        </ModalView>
      )
    },
    confirm : function(e){
      e.preventDefault();
      var httpRequest = new XMLHttpRequest();

      var callback = function(data){
        for (var i = data.categories.length - 1; i >= 0; i--) {
          Dispatcher.dispatch('categories:save', data.categories[i]);
        }
        for (var i = data.items.length - 1; i >= 0; i--) {
          Dispatcher.dispatch('items:save', data.items[i]);
        }
        Dispatcher.dispatch('actions:close', {
          type : 'firstLaunch'
        });
      }

      httpRequest.onreadystatechange = function() {
          if (httpRequest.readyState === 4) {
              if (httpRequest.status === 200) {
                  var data = JSON.parse(httpRequest.responseText);
                  if (callback) callback(data);
              }
          }
      };
      httpRequest.open('GET', 'exampledata.json');
      httpRequest.send();

    },
    cancel : function(e){
      e.preventDefault();
      Dispatcher.dispatch('actions:close', {
        type : 'firstLaunch'
      });
    }
  });

  module.exports = FirstLaunchView;

}).call(this);