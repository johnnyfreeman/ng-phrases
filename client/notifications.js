// unnamed collection for notifications
Notifications = new Meteor.Collection(null);

Template.notifications.rendered = function() {
  // init plugins
};

Template.notifications.notifications = function () {
  return Notifications.find();
};

Template.notificationItem.rendered = function() {
  // init plugins
};

// remove notifications 3 seconds after they are created
Template.notificationItem.created = function(arg1) {
  var timeout = this.data.timeout;
  if (timeout) {
    var notificationId = this.data._id;

    Meteor.setTimeout(function() {
      Notifications.remove(notificationId);
    }, timeout);
  }
};

Template.notificationItem.events({
  'click .close': function (e) {
    e.preventDefault();
    Notifications.remove(this._id);
  }
});