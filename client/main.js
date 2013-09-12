

Template.main.rendered = function(e) {
  // slimscroll for tags
  $(this.find('#left .scroll')).slimScroll({
  color: '#999',
  size: '5px',
  height: '591px'
  });
};


// loading helper
Template.main.appReady = function () {
  return App.subs.tags.ready() && App.subs.phrases.ready();
};

// storage for loading notification
var loadingId;

// on every start up add loading notification
Meteor.startup(function() {
  loadingId = Notifications.insert({iconClass:'icon-spinner icon-spin',message:'Loading...', timeout: 0, closeBtn: false});
});


// when app is ready, remove loading notification
Meteor.startup(function() {
  Deps.autorun(function(autorun) {
    if (App.subs.tags.ready() && App.subs.phrases.ready()) {
      Notifications.remove(loadingId);
      autorun.stop();
    }
  });
});