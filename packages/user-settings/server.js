// Set up settings collection
Settings = new Meteor.Collection('settings');


// User Settings
Meteor.publish('settings', function() {
  return Settings.find({userId: {$in: [this.userId, 'default']}});
});


Settings.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    // allow users to update their own settings
    return doc.userId === userId;
  },
  remove: function(userId, doc) {
    // allow users to delete their own settings
    return doc.userId === userId;
  }
});