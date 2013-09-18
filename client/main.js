

Template.main.rendered = function(e) {
  // slimscroll for tags
  $(this.find('#left .scroll')).slimScroll({
  color: '#999',
  size: '5px',
  height: '591px'
  });


  if (App.perfDebugging) {
    console.log('main rendered', this);
  }
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


Template.listingInfo.activeTags = function() {
  var activeTags = Tags.find({_id: {$in: Session.get('active_tags')}});
  return activeTags.count() > 0 ? activeTags : false;
};



Template.listingInfo.rendered = function () {
  if (App.perfDebugging) {
    console.log('listingInfo rendered', this);
  }
};