Template.main.rendered = function(e) {
  // slimscroll for tags
  $(this.find('#left .scroll')).slimScroll({
  color: '#999',
  size: '5px',
  height: '591px'
  });
};

// subscribe to all tags that the server is publishing
var tagSubscription = Meteor.subscribe('tags');
var phraseSubscription = Meteor.subscribe('phrases');

var appReady = function() {
  return tagSubscription && phraseSubscription && tagSubscription.ready() && phraseSubscription.ready();
}

// loading helper
Template.main.appReady = function () {
  return appReady();
};


var loadingId;
Meteor.startup(function() {
  loadingId = Notifications.insert({iconClass:'icon-spinner icon-spin',message:'Loading...', timeout: 0, closeBtn: false});
});
Deps.autorun(function(autorun) {
  if (appReady()) {
    Notifications.remove(loadingId);
    autorun.stop();
  }
});