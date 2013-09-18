// namespace for app helpers
App = {};

// namespace for app subscriptions
App.subs = {};

// register event handler
App.on = function(eventName, callback) {
  bean.on(App, eventName, callback);
};

// register event handler that only runs once
App.one = function(eventName, callback) {
  bean.one(App, eventName, callback);
};

// unregisters an event handler
App.off = function(eventName, callback) {
  bean.off(App, eventName, callback);
};

// triggers an event
App.trigger = function(eventName) {
  bean.fire(App, eventName);
};

App.perfDebugging = false;

try {
  App.perfDebugging = RequestData.get('perfDebugging');
} catch (e) {
  // do nothing
}