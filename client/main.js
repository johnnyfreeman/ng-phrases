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

// loading helper
Template.main.appReady = function () {
  if (tagSubscription && phraseSubscription && tagSubscription.ready() && phraseSubscription.ready()) {
    return true;
  }
};