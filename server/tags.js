// TODO: this function should only run once!
Meteor.publish('userTags', function() {
  var self = this;
  var uniqueTags = [];
  var userPhrases = Phrases.find({userId:this.userId}, {fields: {tags: 1}});

  userPhrases.forEach(function(phrase) {
    _.each(phrase.tags, function(tagId) {
      if (!_.contains(uniqueTags, tagId)) {
        uniqueTags.push(tagId);
      };
    });
  });

  var observer = userPhrases.observeChanges({
    added: function(phraseId, phrase) {
      _.each(phrase.tags, function(tagId) {
        if (!_.contains(uniqueTags, tagId)) {
          uniqueTags.push(tagId);
          self.added('tags', tagId, Tags.findOne(tagId));
        };
      });
    }
  });

  // stop observing when this tags stop publishing
  self.onStop(function() {
    observer.stop();
  });

  // return Tags cursor
  return Tags.find({_id: {$in: uniqueTags}});
});

Meteor.publish('allTags', function() {
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