// TODO: this function should only run once!
// Meteor.publish('tags', function() {
//   var self = this;
//   var uniqueTags = [];
//   var userPhrases = Phrases.find({userId:this.userId});

//   // TODO: figure out why this is being called three times for every one add event
//   var observer = userPhrases.observeChanges({
//     added: function(id, phrase) {
//       _.each(phrase.tags, function(tag) {
//         if (!_.contains(uniqueTags, tag)) {
//           uniqueTags.push(tag);
//           self.added('tags', tag, Tags.findOne(tag));
//         };
//       });
//     }
//   });

//   // stop observing when this tags stop publishing
//   self.onStop(function() {
//     observer.stop();
//   });

//   // return Tags cursor
//   return Tags.find({_id: {$in: uniqueTags}});
// });

Meteor.publish('tags', function() {
  return Tags.find();
});

Tags.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc, fieldNames, modifier) {
    var user = Meteor.users.findOne(userId);
    return user.profile.admin;
  },
  remove: function(userId, doc) {
    var user = Meteor.users.findOne(userId);
    return user.profile.admin;
  }
});