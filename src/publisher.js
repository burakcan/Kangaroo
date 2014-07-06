(function () {
  var Publisher = function () {
    this.subscribers = {}; /* Subscribers object. Holds subscribers sperated by topics */
    this.topics = []; /* Topics list */
    this.queue = []; /* Message queue. Holds messages sperated by topics */
  }
  Publisher.prototype = {
    subscribe: function (topic, subscriber, thisObj) {
      var topic = topic || 'general';
      /* Check if topic is exists, else create */
      if (topic instanceof Array) {
        var len = topic.length;
        for (var i = 0; i < len; i++) {
          if (!this.subscribers[topic[i]]) {
            this.subscribers[topic[i]] = [];
          }
          /* Check if topic is exists in topic list, else register */
          if (this.topics.indexOf(topic[i]) < 0) {
            this.topics.push(topic[i]);
          }
          /* Register the subscriber */
          subscriber.thisObj = thisObj;
          this.subscribers[topic[i]].push(subscriber);
        }
      } else {
        if (!this.subscribers[topic]) {
          this.subscribers[topic] = [];
        }
        /* Check if topic is exists in topic list, else register */
        if (this.topics.indexOf(topic) < 0) {
          this.topics.push(topic);
        }
        /* Register the subscriber */
        subscriber.thisObj = thisObj;
        this.subscribers[topic].push(subscriber);
      }
    },
    unSubscribe: function (topic, subscriber) {
      var topic = topic || 'general';
      var index = this.subscribers[topic].indexOf(subscriber);
      this.subscribers[topic].splice(index, 1); /* unregister the subscriber */
    },
    addToQueue: function (topic, data) {
      topic = topic || 'general';
      /* Set message object */
      var message = new Object();
      message['topic'] = topic;
      message['data'] = data;
      /* Register message to queue */
      this.queue.push(message);
    },
    processQueue: function (len) {
      var len = len || this.queue.length;
      for (var i = 0; i < len; i++) {
        var message = this.queue.shift();
        this.dispatch(message['data'], message['topic']);
      }
    },
    clearQueue: function () {
      this.queue = [];
    },
    dispatch: function (topic, data) {
      var topic = topic || 'general';
      if (this.subscribers[topic]) {
        var len = this.subscribers[topic].length;

        for (i = 0; i < len; i++) {
          thisObj = this.subscribers[topic][i].thisObj || this;
          this.subscribers[topic][i].call(thisObj, topic, data);
        }
      }
    }
  }

  module.exports = Publisher

}).call(this);