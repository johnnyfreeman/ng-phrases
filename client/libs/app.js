App = {};
App.subs = {};

App.on = function(eventName, callback) {
  bean.on(App, eventName, callback);
};

App.one = function(eventName, callback) {
  bean.one(App, eventName, callback);
};

App.off = function(eventName, callback) {
  bean.off(App, eventName, callback);
};

App.trigger = function(eventName) {
  bean.fire(App, eventName);
};